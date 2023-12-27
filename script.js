// 青いバー
const $red = document.getElementById('red');
const $green = document.getElementById('green');
const $blue = document.getElementById('blue');
const $opacity = document.getElementById('opacity');
 
// 色とカラーコードの表示要素
const $color = document.getElementById('color');
const $colorCode = document.getElementById('color-code');
 
// 青いバーのvalueの表示要素
const $rValue = document.getElementById('r-value');
const $gValue = document.getElementById('g-value');
const $bValue = document.getElementById('b-value');
const $aValue = document.getElementById('a-value');
 
// アップロードするファイルを指定する部分の要素
const $file = document.getElementById('file');
document.getElementById('uploadBtn').addEventListener('click', function() {
    $file.click();  // ファイル入力のクリックイベントをトリガ
});

// キャンバス要素
const $canvas = document.getElementById('canvas');
const ctx = $canvas.getContext('2d');
 
// サイズ,画像の拡大率
let canvasWidth = 0;
let canvasHeight = 0;
let magnificationRate = 1;
 
// 読み込み画像
const image = new Image();

window.onload = () => {
    addEventListeners(); 
    draw(); 
}

function addEventListeners(){
    // 青いバー操作時の処理
    const arr = [$red, $green, $blue, $opacity];
    for(let i=0; i<arr.length; i++)
        arr[i].addEventListener('input', () => draw());
 
    // 画像の読み込み時の処理
    // 読み込み画像にあわせ,サイズ変更,(幅上限 = 360px ,360px超えたら縮小)
    image.addEventListener('load', () => {
        magnificationRate = 1;
        canvasWidth = image.width;
        if(canvasWidth > 360){
            canvasWidth = 360;
            magnificationRate = 360 / image.width;
        }
        canvasHeight = image.height;
        if(magnificationRate != 1)
            canvasHeight = canvasHeight * magnificationRate;
 
        draw();
    });
 
    // アップロードするファイル指定時の処理
    $file.addEventListener('change', () => {
        const input = $file.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            image.src = reader.result;
        });
        reader.readAsDataURL(input);
    });
}

function draw(){
    // 青いバーの値をその右側に表示
    $rValue.innerHTML = $red.value;
    $gValue.innerHTML = $green.value;
    $bValue.innerHTML = $blue.value;
    $aValue.innerHTML = $opacity.value;
 
    // サイズを変更
    $canvas.width = canvasWidth;
    $canvas.height = canvasHeight;
 
    // 画像を描画
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
 
    // 青いバーの値を取得し,設定色とカラーコードを表示
    $color.style.backgroundColor = `rgb(${$red.value}, ${$green.value}, ${$blue.value})`;
    $colorCode.innerHTML = `RGB(${$red.value}, ${$green.value}, ${$blue.value})`;
 
    // 画像に設定した色を重ねる
    ctx.fillStyle = `rgba(${$red.value}, ${$green.value}, ${$blue.value}, ${$opacity.value})`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function download(){
    // 原寸の画像生成し,そこに描画
    const $canvas2 = document.createElement('canvas');
    const ctx2 = $canvas2.getContext('2d');
    $canvas2.width = image.width;
    $canvas2.height = image.height;
    ctx2.drawImage(image, 0, 0);
    ctx2.fillStyle = `rgba(${$red.value}, ${$green.value}, ${$blue.value}, ${$opacity.value})`;
    ctx2.fillRect(0, 0, image.width, image.height);
 
    // ダウンロードリンクの生成,クリック時に処理
    const a = document.createElement('a');
    a.href = $canvas2.toDataURL('image/png');
    a.download = 'image.png';
    a.click();
}
