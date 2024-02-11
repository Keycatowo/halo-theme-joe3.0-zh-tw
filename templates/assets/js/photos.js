
$(document).ready(function(){
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });


    let allImages = [];
    let currentIndex = 0;
    const batchSize = 6;
    const baseUrl = ThemeConfig.blog_url; // 替換成您的API URL

    function loadImages(callback) {
        // ...邏輯保持不變
        if (allImages.length) {
            callback();
            return;
        }

        // 獲取所有圖片
        const apiUrl = baseUrl + '/apis/api.plugin.halo.run/v1alpha1/plugins/PluginPhotos/photos';
        $.getJSON(apiUrl, function(data) {
            allImages = data.items; // 假設這是圖片陣列
            callback();
        });
    }



    function loadBatchImages() {

        const $domLoad = $('.joe_loading')
        loadImages(function() {
            // ...建立和插入元素的邏輯保持不變
            const batchEndIndex = currentIndex + batchSize;
            // 一批載入的圖片項
            const items = [];

            // 獲取當前批次的圖片
            for (; currentIndex < batchEndIndex && currentIndex < allImages.length; currentIndex++) {
                const currentImage = allImages[currentIndex];
                const item = $('<div class="grid-item wow fadeIn" data-sjsel="'+ currentImage.spec.groupName+'">' +
                    '<div class="card__picture">'+
                    '<a class="item animated wow jg-entry" href="'+ currentImage.spec.url+'" data-fancybox="gallery">'+
                    '<img src="'+ currentImage.spec.url + '" alt="' + currentImage.spec.displayName + '"/>' +
                    '</a>'+
                        '</div>'+
                '</div>');

                items.push(item[0]);
            }

            // 將圖片元素新增到網格中並重新佈局
            $grid.append(items)
                .isotope('appended', items)
                .imagesLoaded().progress(function() {
                $grid.isotope('layout');
            });
            // ...其餘邏輯保持不變
            // 如果所有圖片都已載入，可以選擇隱藏載入更多按鈕
            if (currentIndex >= allImages.length) {
                $domLoad.remove()
                ob.unobserve(loading)
            }
        });
    }

    // 初始載入
    loadBatchImages();

    const ob =  new IntersectionObserver(entries => {
        if (entries[0].isIntersecting){
            loadBatchImages();
            let filteredDivs = $('.grid-item').filter(function() {
                return $(this).data('sjsel') === $('.joe_photos__filter li.active').data('sjslink');
            });
            if (filteredDivs.length===0 && currentIndex <= allImages.length && $('.joe_photos__filter li.active').data('sjslink')!=='*') {
                while (filteredDivs.length===0&&currentIndex <= allImages.length){
                    loadBatchImages();
                    filteredDivs = $('.grid-item').filter(function() {
                        return $(this).data('sjsel') === $('.joe_photos__filter li.active').data('sjslink');
                    });
                }
            }else {
            }
                }

    }, {
        threshold:1
    })
    const loading = document.querySelector('.joe_loading')
    ob.observe(loading)


    $('.joe_photos__filter li').on('click', function(){
        let filterValue = $(this).attr('data-sjslink');
        // 新增active
        $(this).addClass('active').siblings().removeClass('active');
        // 重置 Isotope 過濾器為預設值
        $grid.isotope({
            filter: function() {
                // 檢查 data-sjsel 屬性值是否匹配我們篩選的值
                const sjselValue = $(this).attr('data-sjsel'); // 這裡獲取的是.grid-item的data-sjsel
                // 如果 filterValue 是 '*'（顯示所有），或者 sjselValue 匹配篩選值，則保留元素
                return filterValue === '*' || sjselValue === filterValue;
            }
        });
    });
});