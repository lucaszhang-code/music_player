window.addEventListener("DOMContentLoaded", function () {
    let size = getBrowserInterfaceSize();
    console.log("页面宽度：" + size.pageWidth);
    console.log("页面高度：" + size.pageHeight);
    document.body.style.width = size.pageWidth + "px";
    document.body.style.height = size.pageHeight + "px";
});

function getBrowserInterfaceSize() {
    let pageWidth = window.visualViewport.width;
    let pageHeight = window.visualViewport.height;

    return {
        pageWidth: pageWidth,
        pageHeight: pageHeight,
    };
}

window.addEventListener("resize", function () {
    let size = getBrowserInterfaceSize();
    document.body.style.width = size.pageWidth + "px";
    document.body.style.height = size.pageHeight + "px";
});

