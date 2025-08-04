document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let interval;
    const totalItems = carouselItems.length;

    // 初始化轮播
    function initCarousel() {
        // 设置第一张图片为活动状态
        updateCarousel();
        // 启动自动轮播
        startAutoPlay();

        // 事件监听
        prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => moveToSlide(index));
        });

        // 鼠标悬停时暂停自动轮播
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // 更新轮播状态
    function updateCarousel() {
        // 移动轮播容器
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // 更新活动项
        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 移动到指定幻灯片
    function moveToSlide(index) {
        // 处理边界情况
        if (index < 0) {
            currentIndex = totalItems - 1;
        } else if (index >= totalItems) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        updateCarousel();
    }

    // 启动自动轮播
    function startAutoPlay() {
        interval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000); // 5秒切换一次
    }

    // 停止自动轮播
    function stopAutoPlay() {
        clearInterval(interval);
    }

    // 初始化
    initCarousel();
});