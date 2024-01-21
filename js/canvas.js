// 创建AudioContext实例
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 创建AnalyserNode用于频谱分析
const analyser = audioContext.createAnalyser();
analyser.fftSize = 512; // 设置FFT的大小，影响频谱数据的细节
const bufferLength = analyser.frequencyBinCount; // 获取频谱数据的数量
const dataArray = new Uint8Array(bufferLength); // 创建一个数组用于存储频谱数据

// 创建音频源
const audioElement = document.querySelector('audio'); // 选择页面中的audio元素
const source = audioContext.createMediaElementSource(audioElement); // 将audio元素连接到音频上下文
source.connect(analyser); // 连接音频源到分析器
analyser.connect(audioContext.destination); // 连接分析器到音频上下文的输出

// 获取Canvas元素
const canvas = document.querySelector('canvas'); // 选择页面中的canvas元素
const canvasContext = canvas.getContext('2d'); // 获取canvas的2D渲染上下文

// 考虑设备像素比率调整Canvas大小
const pixelRatio = window.devicePixelRatio || 1; // 获取设备的像素比率
function resizeCanvas() {
    canvas.width = (window.innerWidth * 0.6) * pixelRatio; // 根据设备像素比率设置canvas宽度
    canvas.height = (window.innerHeight / 8) * pixelRatio; // 根据设备像素比率设置canvas高度
    canvas.style.width = '100%'; // 设置canvas的CSS宽度
    canvas.style.height = (window.innerHeight / 8) + 'px'; // 设置canvas的CSS高度
    // canvas.style.left = '10%'; // 将canvas居中
    canvas.style.position = 'fixed'; // 设置canvas位置固定
    canvas.style.bottom = '0'; // 设置canvas位于页面底部
    canvasContext.scale(pixelRatio, pixelRatio); // 根据像素比率缩放canvas绘制
}

// 调整Canvas大小
resizeCanvas(); // 初始调整canvas大小
window.addEventListener('resize', resizeCanvas); // 窗口大小变化时调整canvas大小

// 动态绘制频谱图的函数
function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    const halfLength = bufferLength / 2;
    const barWidth = (canvas.width / (halfLength * 2) / pixelRatio);
    const maxHeightPercent = 0.8;

    // 绘制频谱图
    for (let i = 0; i < halfLength; i++) {
        const barHeight = Math.pow(dataArray[i] / 255, 2.5) * (canvas.height / pixelRatio * maxHeightPercent);

        canvasContext.fillStyle = 'rgba(144, 238, 144, 1)';

        // 绘制右侧（从中间向右）
        let x = (canvas.width / 4) + i * barWidth*2 ;
        canvasContext.fillRect(x, canvas.height / pixelRatio - barHeight, barWidth, barHeight);

        // 绘制左侧（从中间向左，镜像）
      x = (canvas.width / 4) - (i + 1) * barWidth*2 ;
        canvasContext.fillRect(x, canvas.height / pixelRatio - barHeight, barWidth, barHeight);
    }
}

draw();


