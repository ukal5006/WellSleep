module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'], // 절대 경로의 기준이 될 디렉토리 설정
                    alias: {
                        '@': './',
                        '@assets': './assets',
                        '@components': './components',
                        '@constants': './constants',
                        '@hooks': './hooks',
                        '@store': './store',
                    },
                },
            ],
        ],
    };
};
