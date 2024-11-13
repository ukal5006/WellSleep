// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import PushNotification from 'react-native-push-notification';
// import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 import

// const Main = () => {
//     // const navigation = useNavigation(); // 네비게이션 훅 사용
//     const [time, setTime] = useState(new Date());
//     const [showPicker, setShowPicker] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const onChange = (event, selectedTime) => {
//         setShowPicker(false);
//         if (selectedTime) {
//             setTime(selectedTime);
//         }
//     };

//     const showTimePicker = () => {
//         setShowPicker(true);
//     };

//     const setAlarm = () => {
//         setShowModal(true);
//     };

//     const confirmAlarm = (caffeineIntake) => {
//         const hours = time.getHours();
//         const minutes = time.getMinutes();
//         const now = new Date();
//         const alarmTime = new Date(now);
//         alarmTime.setHours(hours);
//         alarmTime.setMinutes(minutes);
//         alarmTime.setSeconds(0);

//         if (alarmTime <= now) {
//             alarmTime.setDate(alarmTime.getDate() + 1);
//         }

//         PushNotification.localNotificationSchedule({
//             channelId: 'alarm-channel',
//             title: '기상 알람',
//             message: caffeineIntake ? '카페인을 섭취하셨습니다. 기상 시간이 다가옵니다!' : '기상 시간이 다가옵니다!',
//             date: alarmTime,
//             allowWhileIdle: true,
//         });

//         console.log(`Alarm set for ${hours}:${minutes} with caffeine intake: ${caffeineIntake}`);
//         setShowModal(false);
//     };

//     return (
//         <ImageBackground source={require('../../assets/main.png')} style={styles.background}>
//             <Text style={styles.title}>수면을 시작합니다</Text>
//             <Text style={styles.subtitle}>기상 시간을 설정해주세요</Text>
//             <View style={styles.overlay}>
//                 <Text style={styles.title1}>알람 시간 설정</Text>
//                 <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
//                     <Text style={styles.timeText}>
//                         {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
//                     </Text>
//                 </TouchableOpacity>
//                 {showPicker && <DateTimePicker value={time} mode="time" display="spinner" onChange={onChange} />}
//             </View>

//             <TouchableOpacity style={styles.sleepButton} onPress={setAlarm}>
//                 <Image source={require('../../assets/moon.png')} style={styles.icon} />
//                 <Text style={styles.buttonText}>수면 시작</Text>
//             </TouchableOpacity>

//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={showModal}
//                 onRequestClose={() => setShowModal(false)}
//             >
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>카페인을 섭취하셨나요?</Text>
//                         <View style={styles.modalButtons}>
//                             <TouchableOpacity style={styles.modalButton} onPress={() => confirmAlarm(true)}>
//                                 <Text style={styles.modalButtonText}>네</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.modalButton} onPress={() => confirmAlarm(false)}>
//                                 <Text style={styles.modalButtonText}>아니요</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             {/* Tip 페이지로 이동하는 버튼
//             <TouchableOpacity style={styles.tipButton} onPress={() => navigation.navigate('Tip')}>
//                 <Text style={styles.tipButtonText}>수면 관련 팁 보기</Text>
//             </TouchableOpacity> */}
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         resizeMode: 'cover',
//         alignItems: 'center',
//     },
//     overlay: {
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         padding: 20,
//         borderRadius: 10,
//         marginTop: 150,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         color: '#fff',
//         fontWeight: 'bold',
//         marginTop: 90,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#fff',
//         marginTop: 40,
//     },
//     title1: {
//         fontSize: 24,
//         color: '#fff',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     timeButton: {
//         backgroundColor: '#ffffff',
//         padding: 10,
//         borderRadius: 10,
//         marginTop: 20,
//     },
//     timeText: {
//         fontSize: 20,
//         color: '#211C52',
//         fontWeight: 'bold',
//     },
//     sleepButton: {
//         backgroundColor: '#211C52',
//         borderRadius: 18,
//         marginTop: 160,
//         alignItems: 'center',
//         height: 69,
//         width: 349,
//         justifyContent: 'center',
//         flexDirection: 'row',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 17,
//         fontWeight: 'bold',
//     },
//     icon: {
//         width: 30,
//         height: 30,
//         marginRight: 10,
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 30,
//         borderRadius: 10,
//         width: 300,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#211C52',
//     },
//     modalButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         width: '100%',
//     },
//     modalButton: {
//         backgroundColor: '#211C52',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 10,
//         marginHorizontal: 10,
//     },
//     modalButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     tipButton: {
//         backgroundColor: '#FFA500', // 버튼 배경색 (예: 주황색)
//         borderRadius: 10,
//         paddingVertical: 15,
//         paddingHorizontal: 20,
//         position: 'absolute',
//         bottom: 50,
//         alignSelf: 'center',
//     },
//     tipButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Main;
