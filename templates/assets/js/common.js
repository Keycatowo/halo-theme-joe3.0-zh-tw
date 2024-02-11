/**通用邏輯 */
window.encryption = (str) => window.btoa(unescape(encodeURIComponent(str)));
window.decrypt = (str) => decodeURIComponent(escape(window.atob(str)));

const commonContext = {
	/* 初始化主題模式（僅使用者模式） */
	initMode() {
		// 取消Chrome瀏覽器預設滾動到上次瀏覽位置
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
		if (ThemeConfig.theme_mode !== "user") return;
		const $html = $("html");
		const $icon_light = $(".mode-light");
		const $icon_dark = $(".mode-dark");
		let local_theme = localStorage.getItem("data-mode");

		// 圖示狀態
		$icon_light[`${local_theme === "light" ? "remove" : "add"}Class`]("active");
		$icon_dark[`${local_theme === "light" ? "add" : "remove"}Class`]("active");

		// 手動切換
		$(".joe_action_item.mode").on("click", function (e) {
			e.stopPropagation();
			try {
				local_theme = localStorage.getItem("data-mode");
				let theme = "";
				if (local_theme) {
					theme = local_theme === "light" ? "dark" : "light";
					$icon_light[`${local_theme === "light" ? "add" : "remove"}Class`](
						"active"
					);
					$icon_dark[`${local_theme === "light" ? "remove" : "add"}Class`](
						"active"
					);
					// var commentElement = document.querySelector("halo\\:comment"); // 使用反斜槓轉義冒號
					// commentElement.setAttribute("colorScheme", "'" + local_theme + "'");
				} else {
					theme = "dark";
					$icon_light.removeClass("active");
					$icon_dark.addClass("active");
				}
				$html.attr("data-mode", theme);
				localStorage.setItem("data-mode", theme);
				commonContext.initCommentTheme();
			} catch (err) {
				console.log(err);
			}
		});
	},
	/* 載入條 */
	loadingBar: {
		show() {
			if (!ThemeConfig.enable_loading_bar) return;
			NProgress.configure({
				easing: "ease",
				speed: 500,
				showSpinner: false,
			});
			NProgress.start();
		},
		hide() {
			if (!ThemeConfig.enable_loading_bar) return;
			NProgress.done(true);
		},
	},
	/* 導航條高亮 */
	initNavbar() {
		const $nav_menus = $(".joe_header__above-nav a");
		const $nav_side_menus = $(".panel-side-menu .link");
		let activeIndex = 0;
		const { href, pathname } = location;

		$nav_menus.each((index, item) => {
			const cur_href = item.getAttribute("href");
			if (pathname.includes(cur_href) || href.includes(cur_href)) {
				activeIndex = index;
			}
		});

		// 高亮PC端
		const $curMenu = $nav_menus.eq(activeIndex);
		$curMenu.addClass("current");
		if ($curMenu.parents(".joe_dropdown").length) {
			$curMenu
				.parents(".joe_dropdown")
				.find(".joe_dropdown__link a")
				.addClass("current");
		}

		// 高亮移動端
		$nav_side_menus.eq(activeIndex).addClass("current");
	},
	/* 頁尾位置 */
	initFooter() {
		if (!ThemeConfig.enable_footer || ThemeConfig.footer_position !== "fixed")
			return;
		$("#Joe").css("margin-bottom", $(".joe_footer").height() + 30);
	},
	/* 初始化評論主題 */
	initCommentTheme() {
		const comments = document.getElementsByTagName("halo-comment");
		const curMode = document.querySelector("html").getAttribute("data-mode");
		// 黑夜模式下
		for (let i = 0; i < comments.length; i++) {
			const shadowDom = comments[i].shadowRoot.getElementById("halo-comment");
			$(shadowDom)[`${curMode === "light" ? "remove" : "add"}Class`]("dark");
		}
	},
	/* 初始化程式碼區域，高亮 + 行號 + 摺疊 + 複製 */
	initCode(isRefresh) {
		// const isPost = $(".page-post").length > 0;
		const $codeElms = $(".page-post pre, .page-journals pre, .page-sheet pre");
		if (!$codeElms.length) return;

		$codeElms.each(function (_index, item) {
			const $item = $(item);
			const $codes = $item.find("code");
			if ($codes.length > 0) {
				if (isRefresh) {
					// 更新時重新繫結事件
					$item
						.find(".code-expander")
						.off("click")
						.on("click", function (e) {
							e.stopPropagation();
							const $this = $(this);
							const $auto_fold = $this
								.parent("pre")
								.siblings(".toolbar")
								.find(".autofold-tip");
							$auto_fold && $auto_fold.remove();
							$this.parent("pre").toggleClass("close");
						});
					return;
				}
				// 新增預設程式碼型別為純文字（已在prism原始碼中處理）
				// const $curCode = $codes.eq(0);
				// if (
				// 	!$curCode.attr("class") ||
				//   $curCode.attr("class").indexOf("language-") === -1
				// ) {
				// 	$($curCode[0]).addClass("language-text");
				// }
				ThemeConfig.enable_code_title ? $item.addClass("c_title") : null;
				ThemeConfig.enable_code_hr ? $item.addClass("c_hr") : null;
				ThemeConfig.enable_code_macdot ? $item.addClass("c_macdot") : null;
				ThemeConfig.enable_code_newline ? $item.addClass("c_newline") : null;
				ThemeConfig.show_tools_when_hover
					? $item.addClass("c_hover_tools")
					: null;
				// ThemeConfig.enable_code_line_number
				// 	? $item.addClass("line-numbers")
				// 	: null;
				// 程式碼摺疊
				if (ThemeConfig.enable_code_expander) {
					$item
						.prepend(
							"<i class=\"joe-font joe-icon-arrow-downb code-expander\" title=\"摺疊/展開\"></i>"
						)
						.addClass("c_expander");
					$item.find(".code-expander").on("click", function (e) {
						e.stopPropagation();
						const $this = $(this);
						const $auto_fold = $this
							.parent("pre")
							.siblings(".toolbar")
							.find(".autofold-tip");
						$auto_fold && $auto_fold.remove();
						$this.parent("pre").toggleClass("close");
					});
				}
				// 程式碼複製
				if (ThemeConfig.enable_code_copy) {
					const text = $item.find("code[class='language-none'], code[class*='language-']").text();
					const span = $(
						"<span class=\"copy-button\"><i class=\"joe-font joe-icon-copy\" title=\"複製程式碼\"></i></span>"
					);
					new ClipboardJS(span[0], {
						// text: () => text + "\r\n\r\n" + ThemeConfig.copy_right_text,
						text: () => text,
					}).on("success", () => Qmsg.success("複製成功！"));
					$item.addClass("c_copy").append(span);
				}
			}
		});
	},
	/*自動摺疊長程式碼 <僅針對文章頁>*/
	foldCode() {
		if (!$(".page-post").length) return; // 僅針對文章頁
		if (
			ThemeConfig.enable_code_expander &&
      ThemeConfig.enable_fold_long_code &&
      PageAttrs.metas_enable_fold_long_code !== "false"
		) {
			$(".page-post pre[class*='language-']").each(function (_index, item) {
				const $item = $(item);
				if ($item.height() > ThemeConfig.long_code_height) {
					const $title = $item
						.siblings(".toolbar")
						.find(".toolbar-item span")
						.eq(0);
					$title.append("<em class=\"autofold-tip\"><已自動摺疊></em>");
					$item.addClass("close");
				}
			});
		}
	},
	/* 獲取頁面百度收錄情況 */
	initBaidu() {
		if (!ThemeConfig.check_baidu_collect || !$("#joe_baidu_record").length)
			return;
		Utils.request({
			url: ThemeConfig.BASE_URL + "/halo-api/bd/iscollect",
			method: "GET",
			returnRaw: true,
			data: {
				url: ThemeConfig.blog_url + window.location.pathname,
			},
		})
			.then((res) => {
				if (res.data && res.data.collected) {
					$("#joe_baidu_record").css("color", "#67c23a").html("已收錄");
				} else {
					/* 如果填寫了Token，則自動推送給百度 */
					if (ThemeConfig.baidu_token) {
						$("#joe_baidu_record").html(
							"<span style=\"color: #e6a23c\">未收錄，推送中...</span>"
						);
						let _timer = setTimeout(function () {
							Utils.request({
								url: ThemeConfig.BASE_URL + "/halo-api/bd/push",
								method: "POST",
								returnRaw: true,
								data: {
									site: ThemeConfig.blog_url,
									token: ThemeConfig.baidu_token,
									urls: window.location.href,
								},
							})
								.then((res) => {
									if (res.data.success === 0) {
										$("#joe_baidu_record").html(
											"<span style=\"color: #f56c6c\">推送失敗，請檢查！</span>"
										);
									} else {
										$("#joe_baidu_record").html(
											"<span style=\"color: #67c23a\">推送成功！</span>"
										);
									}
								})
								.catch((err) => {
									console.log(err);
								});
							clearTimeout(_timer);
							_timer = null;
						}, 1000);
					} else {
						const url = `https://ziyuan.baidu.com/linksubmit/url?sitename=${encodeURI(
							window.location.href
						)}`;
						$("#joe_baidu_record").html(
							`<a target="_blank" href="${url}" rel="noopener noreferrer nofollow" style="color: #f56c6c">未收錄，提交收錄</a>`
						);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
	/* 音樂播放器 */
	initMusic() {
		if (!ThemeConfig.enable_global_music_player) return;
		Utils.request({
			url: `${ThemeConfig.music_api}?server=${ThemeConfig.music_source}&type=${ThemeConfig.music_player_type}&id=${ThemeConfig.music_list_id}`,
			type: "GET",
			returnRaw: true,
		})
			.then((res) => {
				new APlayer({
					container: document.getElementById("global-aplayer"),
					fixed: true,
					lrcType: 0,
					theme: ThemeConfig.music_player_theme,
					autoplay: ThemeConfig.music_auto_play,
					volume: ThemeConfig.music_player_volume,
					loop: ThemeConfig.music_loop_play,
					audio: res,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	},
	/* 渲染PDF */
	initPDF() {
		const $pdfs = $("joe-pdf");
		if (!$pdfs.length) return;
		$pdfs.each((_index, item) => {
			const $item = $(item);
			options = {
				src: $item.attr("src") || "",
				width: $item.attr("width") || "100%",
				height: $item.attr("height") || "500px",
			};
			let htmlStr = "";
			if (!options.src) {
				htmlStr = "<p>pdf地址未填寫！</p>";
			} else {
				htmlStr = `
      <div class="joe_pdf">
        <iframe src="${ThemeConfig.BASE_RES_URL}/assets/lib/pdfjs/web/viewer.html?file=${options.src}" style="width:${options.width};height:${options.height}"></iframe>
      </div>`;
			}
			$(item).replaceWith(htmlStr);
		});
	},
	/* 全域性返回頂 */
	back2Top() {
		if (!ThemeConfig.enable_back2top) return;
		const $el = $(".joe_action_item.back2top");
		const handleScroll = () => {
			const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
			$el[(scrollTop > 300 ? "add" : "remove") + "Class"]("active");
		};

		handleScroll();

		$(document).on("scroll", Utils.throttle(handleScroll, 120));
		$el.on("click", function (e) {
			e.stopPropagation();
			$("html,body").animate(
				{
					scrollTop: 0,
				},
				ThemeConfig.enable_back2top_smooth ? 500 : 0
			);
		});
	},
	/* 啟用側邊欄人生倒計時 */
	initTimeCount() {
		if (Joe.isMobile || !$(".joe_aside__item.timelife").length) return;
		let timelife = [
			{
				title: "今日已經過去",
				endTitle: "小時",
				num: 0,
				percent: "0%",
			},
			{
				title: "這周已經過去",
				endTitle: "天",
				num: 0,
				percent: "0%",
			},
			{
				title: "本月已經過去",
				endTitle: "天",
				num: 0,
				percent: "0%",
			},
			{
				title: "今年已經過去",
				endTitle: "個月",
				num: 0,
				percent: "0%",
			},
		];
		{
			let nowDate = +new Date();
			let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
			let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
			let todayPassHoursPercent = (todayPassHours / 24) * 100;
			timelife[0].num = parseInt(todayPassHours);
			timelife[0].percent = parseInt(todayPassHoursPercent) + "%";
		}
		{
			let weeks = {
				0: 7,
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
			};
			let weekDay = weeks[new Date().getDay()];
			let weekDayPassPercent = (weekDay / 7) * 100;
			timelife[1].num = parseInt(weekDay);
			timelife[1].percent = parseInt(weekDayPassPercent) + "%";
		}
		{
			let year = new Date().getFullYear();
			let date = new Date().getDate();
			let month = new Date().getMonth() + 1;
			let monthAll = new Date(year, month, 0).getDate();
			let monthPassPercent = (date / monthAll) * 100;
			timelife[2].num = date;
			timelife[2].percent = parseInt(monthPassPercent) + "%";
		}
		{
			let month = new Date().getMonth() + 1;
			let yearPass = (month / 12) * 100;
			timelife[3].num = month;
			timelife[3].percent = parseInt(yearPass) + "%";
		}
		let htmlStr = "";
		timelife.forEach((item, index) => {
			htmlStr += `
						<div class="item">
							<div class="title">
								${item.title}
								<span class="text">${item.num}</span>
								${item.endTitle}
							</div>
							<div class="progress">
								<div class="progress-bar">
									<div class="progress-bar-inner progress-bar-inner-${index}" style="width: ${item.percent}"></div>
								</div>
								<div class="progress-percentage">${item.percent}</div>
							</div>
						</div>`;
		});
		$(".joe_aside__item.timelife .joe_aside__item-contain").html(htmlStr);
	},
	/* 啟用側邊欄天氣 */
	initWeather() {
		if (
			Joe.isMobile ||
      !ThemeConfig.enable_weather ||
      !ThemeConfig.weather_key ||
      !$("#he-plugin-simple").length
		)
			return;
		window.WIDGET = {
			CONFIG: {
				modules: "120",
				background: "5",
				tmpColor: "FFFFFF",
				tmpSize: "13",
				cityColor: "FFFFFF",
				citySize: "13",
				aqiColor: "FFFFFF",
				aqiSize: "13",
				weatherIconSize: "13",
				alertIconSize: "13",
				padding: "5px 5px 4px 5px",
				shadow: "0",
				language: "auto",
				borderRadius: "4",
				fixed: "true",
				vertical: "top",
				horizontal: "left",
				key: ThemeConfig.weather_key,
			},
		};
		$.getScript(
			"https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0"
		);
	},
	/* 全域性圖片預覽（文章、日誌頁等） */
	initGallery() {
		// 只對符合條件的圖片開啟預覽功能
		const $allImgs = $(
			".page-post .joe_detail__article img:not([class]), .page-journals .joe_journal_block img:not([class]), .page-sheet img:not([class])"
		);
		if (!$allImgs.length) return;
		$allImgs.each(function () {
			const $this = $(this);
			$this.wrap(
				$(
					`<span style="display: block;" data-fancybox="Joe" href="${$this.attr(
						"src"
					)}"></span>`
				)
			);
		});
	},
	/* 設定頁面中連結的開啟方式 */
	initExternalLink() {
		let $allLink;

		if (ThemeConfig.link_behavior !== "default") {
			// 自定義行為（全域性處理，不包括導航條和頁尾，導航條可以在後臺管理-選單中配置）
			$allLink = $(".joe_main_container a[href]"); // 頁面中所有a標籤

			if (!$allLink.length) return;

			$allLink.each(function () {
				const $this = $(this);
				const curHref=$this.attr("href");
				if(!curHref.includes("javascript:;")){
					let target = "";
					target =
          ThemeConfig.link_behavior === "new" &&
          !$this.attr("href").startsWith("#")
          	? "_blank"
          	: "";
					$this.attr({
						target,
						rel: "noopener noreferrer nofollow",
					});
				}
			});
		} else {
			// 主題預設行為（只處理了部分頁面的a標籤）
			$allLink = $(
				".page-post .joe_detail__article a[href], .joe_journal_body a[href], .page-sheet .joe_detail__article a[href]"
			); // 內容區域中所有a標籤（文章/日誌頁）
			if (!$allLink.length) return;

			$allLink.each(function () {
				const $this = $(this);
				// 排除內容中的錨點、排除href設定為javascript:;的情況
				const curHref=$this.attr("href");
				if(!curHref.includes("javascript:;")){
					const target = !curHref.startsWith("#") ? "_blank" : "";
					$this.attr({
						target,
						rel: "noopener noreferrer nofollow",
					});
				}
			});
		}
	},
	/* 初始化3D標籤雲 */
	init3dTag() {
		ThemeConfig.tag_cloud_type = document.getElementById('tags-3d') ? '3d' : 'list'
		ThemeConfig.enable_tag_cloud=document.querySelector('.joe_aside__item.tags-cloud') !== null
		// console.log(ThemeConfig.enable_tag_cloud)
		if (
			Joe.isMobile ||
      !ThemeConfig.enable_tag_cloud ||
      ThemeConfig.tag_cloud_type !== "3d" ||
      !$(".tags-cloud-list").length
		)
			return;
		$.getScript(
			`${ThemeConfig.BASE_RES_URL}/assets/lib/3dtag/3dtag.min.js`,
			(_res) => {
				const entries = [];
				const colors = [
					"#F8D800",
					"#0396FF",
					"#EA5455",
					"#7367F0",
					"#32CCBC",
					"#F6416C",
					"#28C76F",
					"#9F44D3",
					"#F55555",
					"#736EFE",
					"#E96D71",
					"#DE4313",
					"#D939CD",
					"#4C83FF",
					"#F072B6",
					"#C346C2",
					"#5961F9",
					"#FD6585",
					"#465EFB",
					"#FFC600",
					"#FA742B",
					"#5151E5",
					"#BB4E75",
					"#FF52E5",
					"#49C628",
					"#00EAFF",
					"#F067B4",
					"#F067B4",
					"#ff9a9e",
					"#00f2fe",
					"#4facfe",
					"#f093fb",
					"#6fa3ef",
					"#bc99c4",
					"#46c47c",
					"#f9bb3c",
					"#e8583d",
					"#f68e5f",
				];
				const random = (min, max) => {
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min + 1)) + min;
				};
				$(".tags-cloud-list a").each((i, item) => {
					entries.push({
						label: $(item).attr("data-label"),
						url: $(item).attr("data-url"),
						target: "_blank",
						fontColor: colors[random(0, colors.length - 1)],
						fontSize: 16,
					});
				});
				$("#tags-3d").svg3DTagCloud({
					entries,
					width: 250,
					height: 250,
					radius: "65%",
					radiusMin: 75,
					bgDraw: false,
					fov: 800,
					speed: 0.5,
					fontWeight: 500,
				});
				$(".tags-cloud-list").remove();
				$("#tags-3d .empty").remove();
			}
		);
	},
	/* 搜尋框彈窗 */
	// searchDialog() {
	// 	const $result = $(".joe_header__above-search .result");
	// 	$(".joe_header__above-search .input").on("click", function (e) {
	// 		e.stopPropagation();
	// 		$result.addClass("active");
	// 	});
	// 	$(document).on("click", function () {
	// 		$result.removeClass("active");
	// 	});
	// },
	/* 啟用全域性下拉框 */
	initDropMenu() {
		$(".joe_dropdown").each(function (index, item) {
			const menu = $(this).find(".joe_dropdown__menu");
			const trigger = $(item).attr("trigger") || "click";
			const placement = $(item).attr("placement") || $(this).height() || 0;
			menu.css("top", placement);
			if (trigger === "hover") {
				$(this).hover(
					() => $(this).addClass("active"),
					() => $(this).removeClass("active")
				);
			} else {
				$(this).on("click", function (e) {
					e.stopPropagation();
					$(this).toggleClass("active");
					$(document).one("click", () => $(this).removeClass("active"));
					e.stopPropagation();
				});
				menu.on("click", (e) => e.stopPropagation());
			}
		});
	},
	/* 小螢幕伸縮側邊欄 */
	drawerMobile() {
		$(".joe_header__above-slideicon").on("click", function (e) {
			e.stopPropagation();
			/* 關閉搜尋框 */
			$(".joe_header__searchout").removeClass("active");
			/* 處理開啟關閉狀態 */
			const $html = $("html");
			const $mask = $(".joe_header__mask");
			const $slide_out = $(".joe_header__slideout");
			if ($slide_out.hasClass("active")) {
				$html.removeClass("disable-scroll");
				$mask.removeClass("active slideout");
				$slide_out.removeClass("active");
			} else {
				// 儲存滾動位置
				window.sessionStorage.setItem("lastScroll", $html.scrollTop());
				$html.addClass("disable-scroll");
				$mask.addClass("active slideout");
				$slide_out.addClass("active");
			}
		});
	},
	/* 小螢幕搜尋框 */
	// searchMobile() {
	// 	$(".joe_header__above-searchicon").on("click", function (e) {
	// 		e.stopPropagation();
	// 		SearchWidget.open();
	//
	// 		/* 關閉側邊欄 */
	// 		$(".joe_header__slideout").removeClass("active");
	// 		/* 處理開啟關閉狀態 */
	// 		const $html = $("html");
	// 		const $mask = $(".joe_header__mask");
	// 		const $header_above = $(".joe_header__above");
	// 		const $search_out = $(".joe_header__searchout");
	// 		console.log($search_out)
	// 		console.log($search_out.hasClass("active"));
	// 		if ($search_out.hasClass("active")) {
	// 			$html.removeClass("disable-scroll");
	// 			$mask.removeClass("active slideout");
	// 			$search_out.removeClass("active");
	// 			$header_above.removeClass("solid");
	// 		} else {
	// 			// 儲存滾動位置
	// 			window.sessionStorage.setItem("lastScroll", $html.scrollTop());
	// 			$html.addClass("disable-scroll");
	// 			$mask.addClass("active");
	// 			$header_above.addClass("solid");
	// 			$search_out.addClass("active");
	// 		}
	// 	});
	// },
	/* 點選遮罩層關閉 */
	maskClose() {
		$(".joe_header__mask")
			.on("click", function (e) {
				e.stopPropagation();
				const $html = $("html");
				$html.removeClass("disable-scroll");
				$(".joe_header__mask").removeClass("active slideout");
				$(".joe_header__searchout").removeClass("active");
				$(".joe_header__slideout").removeClass("active");
				$(".joe_header__toc").removeClass("active");
				$(".joe_header__above").removeClass("solid");

				// 還原滾動位置
				const lastScroll = window.sessionStorage.getItem("lastScroll");
				lastScroll && $html.scrollTop(lastScroll);
				window.sessionStorage.removeItem("lastScroll");
			})
			.on("touchmove", (e) => e.preventDefault);
	},
	/* 移動端側邊欄選單手風琴 */
	sideMenuMobile() {
		$(".joe_header__slideout-menu .current")
			.parents(".panel-body")
			.show()
			.siblings(".panel")
			.addClass("in");
		$(".joe_header__slideout-menu .panel").on("click", function (e) {
			e.stopPropagation();
			const $this = $(this);
			const panelBox = $this.parent().parent();
			/* 清除全部內容 */
			panelBox.find(".panel").not($this).removeClass("in");
			panelBox
				.find(".panel-body")
				.not($this.siblings(".panel-body"))
				.stop()
				.hide("fast");
			/* 啟用當前的內容 */
			$this.toggleClass("in").siblings(".panel-body").stop().toggle("fast");
		});
	},
	/* 頭部滾動 */
	initHeadScroll() {
		if (Joe.isMobile || ThemeConfig.enable_fixed_header) return;
		let last_scroll_position = 0;
		let new_scroll_position = 0;
		const $joeHeader = $(".joe_header__above");
		const $effectEl = $(
			".joe_aside_post, .joe_aside .joe_aside__item:last-child"
		);
		const headerHeight = $joeHeader.height();
		if ($effectEl) {
			var offset1 = headerHeight + 15;
			var offset2 = headerHeight - 60 + 15;
		}

		const handleHeader = () => {
			if (window.tocPhase) return;
			last_scroll_position = window.scrollY;
			if (
				new_scroll_position < last_scroll_position &&
        last_scroll_position > headerHeight
			) {
				$joeHeader.addClass("active");
				$effectEl && $effectEl.css("top", offset2);
			} else if (new_scroll_position > last_scroll_position) {
				$joeHeader.removeClass("active");
				$effectEl && $effectEl.css("top", offset1);
			}
			new_scroll_position = last_scroll_position;
		};

		document.addEventListener("scroll", Utils.throttle(handleHeader, 100));
	},
	/* 渲染最新評論中的 emoji */
	// renderReplyEmoji() {
	// 	const $replys = $(".aside-reply-content");
	// 	$replys.each((_index, item) => {
	// 		// 獲取轉換後的marked
	// 		const markedHtml = marked(item.innerHTML)
	// 			.replace(
	// 				/<img\ssrc[^>]*>/gm,
	// 				"<i class=\"joe-font joe-icon-tupian\"></i>"
	// 			)
	// 			.replace(/bili\//g, "bili/hd/ic_emoji_");
	// 		// 處理其中的表情包
	// 		const emoji = Utils.renderedEmojiHtml(markedHtml);
	// 		// 將回車轉換為br
	// 		item.innerHTML = Utils.return2Br(emoji);
	// 	});
	// },
	/* 禁用瀏覽器空格滾動頁面 */
	cancelSpaceScroll() {
		document.body.onkeydown = function (e) {
			e = e || window.event;
			const elm = e.target || e.srcElement;
			const key = e.keyCode || e.charCode;
			if (key === 32) {
				if (
					["text", "input", "textarea", "halo-comment"].includes(
						elm.tagName.toLowerCase()
					)
				) {
					return;
				}
				if (window.event) {
					e.returnValue = false;
				} else {
					e.preventDefault();
				}
			}
		};
	},
	/* 判斷位址列是否有錨點連結，有則跳轉到對應位置 */
	scrollToHash(hash, duration = 0) {
		hash = hash || window.decodeURIComponent(location.hash);
		if (!hash) return;

		const headerHeight = $(".joe_header").height();
		const $targetEl = $(hash);
		if ($targetEl && $targetEl.length > 0) {
			const scrollTop = $targetEl.offset().top - headerHeight - 15;
			if (duration > 0) {
				$("html,body").animate(
					{
						scrollTop,
					},
					duration
				);
			} else {
				document.documentElement.scrollTop = scrollTop;
			}
		}
	},
	/* 載入滑鼠特效 */
	loadMouseEffect() {
		if (
			Joe.isMobile ||
      ThemeConfig.enable_clean_mode ||
      ThemeConfig.cursor_effect === "off"
		)
			return;
		$.getScript(
			`${ThemeConfig.BASE_RES_URL}/assets/effect/cursor/${ThemeConfig.cursor_effect}.js`
		);
	},
	/* 載入背景特效 */
	loadBackdropEffect() {
		if (
			Joe.isMobile ||
      ThemeConfig.enable_clean_mode ||
      ThemeConfig.backdrop === "off"
		)
			return;
		$.getScript(
			`${ThemeConfig.BASE_RES_URL}/assets/effect/backdrop/${ThemeConfig.backdrop}.js`
		);
	},
	/* 自定義favicon */
	setFavicon() {
		if (!ThemeConfig.favicon) return;
		const favicon = new Favico();
		const image = new Image();
		image.onload = function () {
			favicon.image(image);
		};
		image.src = ThemeConfig.favicon;
	},
	/* 首頁離屏提示 */
	offscreenTip() {
		if (Joe.isMobile || !ThemeConfig.enable_offscreen_tip) return;
		const OriginTitile = document.title;
		let timer = null;
		document.addEventListener("visibilitychange", function () {
			if (
				location.href.indexOf(ThemeConfig.blog_url) > 0 ||
        location.pathname !== "/"
			)
				return;
			if (document.hidden) {
				document.title =
          ThemeConfig.offscreen_title_leave || "歪，你去哪裡了？";
				clearTimeout(timer);
			} else {
				document.title =
          ThemeConfig.offscreen_title_back || "(つェ⊂)咦，又回來了!";
				timer = setTimeout(function () {
					document.title = OriginTitile;
				}, 2000);
			}
		});
	},
	/* 總訪問量 */
	// initUV() {
	// 	if (!ThemeConfig.enable_visit_number) return;
	// 	Utils.request({
	// 		url: "/api/content/statistics/user",
	// 	}).then((res) => {
	// 		res && $("#site-uv").text(res.visitCount || 0);
	// 	});
	// },
	/* 初始化網站執行時間 */
	initBirthday() {
		if (!ThemeConfig.enable_birthday) return;
		if (
			!/^\d+$/.test(ThemeConfig.birthday) &&
      !/^(\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}(:\d{0,2})?)$/.test(
      	ThemeConfig.birthday
      )
		) {
			Qmsg.error("“自定義部落格起始時間” 格式錯誤，請檢查！");
			return;
		}
		const birthDay = new Date(
			/^\d+$/g.test(ThemeConfig.birthday)
				? +ThemeConfig.birthday
				: ThemeConfig.birthday
		);
		const $day = $(".joe_run__day");
		const $hour = $(".joe_run__hour");
		const $minute = $(".joe_run__minute");
		const $second = $(".joe_run__second");
		const getRunTime = () => {
			const today = +new Date();
			const timePast = today - birthDay.getTime();
			let day = timePast / (1000 * 24 * 60 * 60);
			let dayPast = Math.floor(day);
			let hour = (day - dayPast) * 24;
			let hourPast = Math.floor(hour);
			let minute = (hour - hourPast) * 60;
			let minutePast = Math.floor(minute);
			let second = (minute - minutePast) * 60;
			let secondPast = Math.floor(second);
			day = String(dayPast).padStart(2, 0);
			hour = String(hourPast).padStart(2, 0);
			minute = String(minutePast).padStart(2, 0);
			second = String(secondPast).padStart(2, 0);
			$day.html(day);
			$hour.html(hour);
			$minute.html(minute);
			$second.html(second);
		};
		getRunTime();
		setInterval(getRunTime, 1000);
	},
	/* 頁面載入耗時（控制檯） */
	showLoadTime() {
		if (Joe.isMobile || !ThemeConfig.show_loaded_time) return;
		const consume_time = performance.now();
		consume_time &&
      console.log(
      	"%c頁面載入耗時：" + Math.round(consume_time) + " ms",
      	"padding: 6px 8px;color:#fff;background:linear-gradient(270deg, #4edb21, #f15206);border-radius: 3px;"
      );
	},
	/* 除錯模式 */
	debug() {
		if (!ThemeConfig.enable_debug) return;
		new window.VConsole();
	},
	/* 清理工作 */
	clean() {
		// 移除無用標籤
		$("#compatiable-checker").remove();
		$("#theme-config-getter").remove();
		$("#metas-getter").remove();
		$("#theme-config-getter").remove();
		// 重置操作
		commonContext.loadingBar.hide();
	},
};

!(function () {
	const omits = [
		"loadingBar",
		"init3dTag",
		"foldCode",
		"loadMouseEffect",
		"loadBackdropEffect",
		"setFavicon",
		"initUV",
		"showLoadTime",
		"debug",
		"clean",
	];

	document.addEventListener("DOMContentLoaded", function () {
		commonContext.loadingBar.show();
		// window.lazySizesConfig = window.lazySizes.cfg || {};
		// window.lazySizesConfig.init = false;
		// window.lazySizesConfig.loadMode = 1;
		// window.lazySizesConfig.loadHidden = false;
		// lazySizes.init();
		Object.keys(commonContext).forEach(
			(c) => !omits.includes(c) && commonContext[c]()
		);
	});

	window.addEventListener("load", function () {
		if (omits.length === 1) {
			commonContext[omits[0]]();
		} else {
			omits.forEach(
				(c) => c !== "loadingBar" && commonContext[c] && commonContext[c]()
			);
		}
	});
})();

window.commonContext = commonContext;
