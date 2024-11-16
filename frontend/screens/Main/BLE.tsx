import { useEffect, useState } from 'react';
import { Button, Platform, Text, TouchableOpacity, View } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { atob } from 'react-native-quick-base64'; // Base64 디코딩을 위해 추가
import { useAndroidPermissions } from '../../useAndroidPermissions';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';
import { END_SLEEP, INIT_SLEEP, LIVE_SLEEP } from '../../constants/apis';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../store/userSlice';

const bleManager = new BleManager();

const DEVICE_NAME = 'HMSoft';
const SERVICE_UUID = '0000FFE0-0000-1000-8000-00805F9B34FB';
const STEPCOUNT_CHARACTERISTIC_UUID = '0000FFE1-0000-1000-8000-00805F9B34FB';

const SleepingContainer = styled(View)``;

const SleepingTitle = styled(Text)`
    margin-top: 50px;
    font-size: 30px;
    color: white;
`;
const SleepingText = styled(Text)`
    margin-top: 50px;
    font-size: 15px;
    color: white;
`;

export default function BLE({ totalInformationId }) {
    const [hasPermissions, setHasPermissions] = useState<boolean>(Platform.OS === 'ios');
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [device, setDevice] = useState<Device | null>(null);
    const [waitingPerm, grantedPerm] = useAndroidPermissions();
    const [connectionStatus, setConnectionStatus] = useState('Searching...');
    const [sensorData, setSensorData] = useState<any>(null); // 데이터 상태를 객체로 변경
    const [buffer, setBuffer] = useState(''); // 데이터 버퍼
    const { userDataFetch } = useAxios();
    const [tmpId, setTmpId] = useState(0);
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const dispatch = useDispatch(); // dispatch 가져오기
    // 실시간 수면 측정
    const liveSleep = async (tmpId: number) => {
        await userDataFetch('POST', LIVE_SLEEP, {
            key: { totalInformationId, tmpId },
            value: sensorData,
        });
    };
    //초기값
    const initSleep = async (emg: number, o2: number, pulse: number) => {
        await userDataFetch('POST', INIT_SLEEP, {
            emg,
            o2,
            pulse,
        });

        // userInfo 업데이트
        dispatch(updateUserInfo({ emg, o2, pulse })); // 상태 업데이트
    };

    useEffect(() => {
        if (sensorData) {
            if (userInfo?.pulse === 0) {
                initSleep(sensorData.emg, sensorData.o2, sensorData.pulse);
            }
            liveSleep(tmpId);
            setTmpId(tmpId + 1);
        }
    }, [sensorData]);

    useEffect(() => {
        if (!(Platform.OS === 'ios')) {
            setHasPermissions(grantedPerm);
        }
    }, [grantedPerm]);

    useEffect(() => {
        if (hasPermissions) {
            searchAndConnectToDevice();
        }
    }, [hasPermissions]);

    const searchAndConnectToDevice = () =>
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                setIsConnected(false);
                setConnectionStatus('Error searching for devices');
                return;
            }
            if (device?.name === DEVICE_NAME) {
                bleManager.stopDeviceScan();
                setConnectionStatus('Connecting...');
                connectToDevice(device);
            }
        });

    const connectToDevice = async (device: Device) => {
        try {
            const _device = await device.connect();
            await _device.discoverAllServicesAndCharacteristics();
            setConnectionStatus('Connected');
            setIsConnected(true);
            setDevice(_device);
        } catch (error) {
            setConnectionStatus('Error in Connection');
            setIsConnected(false);
        }
    };

    useEffect(() => {
        if (!device) {
            return;
        }

        const subscription = bleManager.onDeviceDisconnected(device.id, (error) => {
            if (error) {
                console.log('Disconnected with error:', error);
            }
            setConnectionStatus('Disconnected');
            setIsConnected(false);
            console.log('Disconnected device');
            setDevice(null);
        });

        return () => subscription.remove();
    }, [device]);

    useEffect(() => {
        if (!device || !device.isConnected) {
            return;
        }
        const sub = device.monitorCharacteristicForService(
            SERVICE_UUID,
            STEPCOUNT_CHARACTERISTIC_UUID,
            (error, char) => {
                if (error || !char) {
                    console.error('Error monitoring characteristic:', error);
                    return;
                }

                // 수신된 데이터를 버퍼에 추가
                setBuffer((prevBuffer) => {
                    const newBuffer = prevBuffer + atob(char.value); // Base64 디코딩 후 추가

                    // JSON 파싱 시도
                    try {
                        // JSON 문자열이 완전한지 확인
                        if (newBuffer.trim().endsWith('}')) {
                            const jsonData = JSON.parse(newBuffer);
                            setSensorData(jsonData); // 이전 데이터를 덮어쓰고 새로운 데이터로 설정
                            return ''; // 버퍼 초기화
                        } else {
                            return newBuffer; // 버퍼를 유지
                        }
                    } catch (e) {
                        // JSON 파싱 에러 시, 버퍼를 유지
                        console.error('Error parsing data:', e);
                        return newBuffer; // 버퍼를 유지
                    }
                });
            }
        );
        return () => sub.remove();
    }, [device]);

    return <SleepingContainer></SleepingContainer>;
}
