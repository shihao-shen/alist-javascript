// 定义一个函数，用于将相对路径转换为绝对路径
function convertRelativePathToAbsolutePath(relativePath) {
    var curPath = window.document.location.href;
    var pathName = window.document.location.pathname.split("/");
    var basename = pathName.pop()
    pathName = pathName.join("/")
    var pos = curPath.indexOf(pathName);
    //获取主机地址
    var currentURL = curPath.substring(0, pos)+"/p/"+pathName;

    
    if (relativePath.startsWith('./')) {
        return currentURL + relativePath.slice(1);
    }
    return relativePath;
}

// 创建一个MutationObserver实例，用于监控DOM树的变化
const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
            // 遍历新添加到页面的节点
            mutation.addedNodes.forEach((node) => {
                // 检查节点是否是HTMLElement（可能包含子元素）
                
                if (node instanceof HTMLElement) {
                    // 查询所有子标签内的img标签
                    const imgTags = node.querySelectorAll('img');
                    imgTags.forEach((imgTag) => {
                        const src = imgTag.getAttribute('src');
                        // console.log(imgTag)
                        if (src && src.startsWith('./')) {
                            // 修改img标签的src属性为绝对路径
                            imgTag.setAttribute('src', convertRelativePathToAbsolutePath(src));
                        }
                    });
                }
            });
        }
    });
});

// 配置MutationObserver，监控DOM树的子节点变化
const observerConfig = {
    childList: true,
    subtree: true,
};


// 在页面加载完成后执行
window.onload = function () {
    // 启动MutationObserver，开始监控页面变化
    observer.observe(document.body, observerConfig);
};
