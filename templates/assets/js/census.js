/**統計頁邏輯 */
const censusContext = {
	/* 系統資料 */
	system() {
		/* 轉換位元組 */
		const bytesToSize = (bytes) => {
			if (!bytes) return "0 B";
			const k = 1000,
				sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
				i = Math.floor(Math.log(bytes) / Math.log(k));
			return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
		};
		/* 轉換記憶體 */
		const megaknotsToSize = (limit) => {
			if (limit < 1024) return parseInt(limit) + " MB";
			return parseInt(limit / 1024) + " GB";
		};
		const categories = [];
		const upSeries = [];
		const downSeries = [];
		const flowDom = document.querySelector("#flow");
		const workDom = document.querySelector("#work");
		const flowChart = flowDom && echarts.init(flowDom);
		const workChart = workDom && echarts.init(workDom);
		if (flowDom && workDom) initChart();

		function initChart() {
			Utils.request({
				url: Joe.BASE_API,
				type: "POST",
				returnRaw: true,
				data: {
					routeType: "server_status",
				},
			})
				.then((res) => {
					if (!res.status) Qmsg.warning("伺服器介面異常！");
					{
						$(".joe_census__server-item .count .core").html(`${res.cpu[1]} 核`);
						$(".joe_census__server-item .count .ram").html(
							`${megaknotsToSize(res.memory.memTotal)}`
						);
						$(".joe_census__server-item .count .up").html(
							`總髮送：${bytesToSize(res.upTotal)}`
						);
						$(".joe_census__server-item .count .down").html(
							`總接收：${bytesToSize(res.downTotal)}`
						);
						const stamp = new Date();
						const hours = String(stamp.getHours()).padStart(2, 0);
						const minutes = String(stamp.getMinutes()).padStart(2, 0);
						const seconds = String(stamp.getSeconds()).padStart(2, 0);
						const time = `${hours}:${minutes}:${seconds}`;
						categories.push(time);
						upSeries.push(res.up);
						downSeries.push(res.down);
						if (categories.length > 5) categories.shift();
						if (upSeries.length > 5) upSeries.shift();
						if (downSeries.length > 5) downSeries.shift();
						flowChart.setOption({
							title: {
								subtext: "單位 KB/s",
							},
							grid: {
								left: "3%",
								right: "4%",
								bottom: "3%",
								containLabel: true,
							},
							tooltip: {
								trigger: "axis",
								axisPointer: {
									type: "cross",
									label: {
										backgroundColor: "#6a7985",
									},
								},
							},
							xAxis: {
								axisTick: {
									show: false,
								},
								type: "category",
								boundaryGap: false,
								data: categories,
							},
							yAxis: {
								type: "value",
							},
							series: [
								{
									type: "line",
									name: "上行",
									smooth: true,
									showSymbol: false,
									itemStyle: {
										normal: {
											color: "#f39494",
											areaStyle: {
												color: "#f39494",
											},
											lineStyle: {
												width: 2,
												color: "#f39494",
											},
										},
									},
									stack: "總量",
									data: upSeries,
								},
								{
									type: "line",
									name: "下行",
									smooth: true,
									showSymbol: false,
									itemStyle: {
										normal: {
											color: "#9dd3e8",
											areaStyle: {
												color: "#9dd3e8",
											},
											lineStyle: {
												width: 2,
												color: "#9dd3e8",
											},
										},
									},
									stack: "總量",
									data: downSeries,
								},
							],
						});
					}
					{
						/* CPU佔用 */
						const cpuUse = res.cpu[0];
						/* 記憶體佔用 */
						const memoryRealUse =
              Math.round(
              	(res.memory.memRealUsed / res.memory.memTotal) * 1000
              ) / 10;
						/* 記憶體緩衝 */
						const memoryCacheUse =
              Math.round((res.memory.memCached / res.memory.memTotal) * 1000) /
              10;
						/* 系統緩衝 */
						const memoryBufferUse =
              Math.round((res.memory.memBuffers / res.memory.memTotal) * 1000) /
              10;
						/* 系統負載 */
						const systemLoad =
              Math.round((res.load.one / res.load.max) * 100) > 100
              	? 100
              	: Math.round((res.load.one / res.load.max) * 100);
						workChart.setOption({
							title: {
								subtext: "單位 百分比",
							},
							tooltip: {
								trigger: "axis",
								axisPointer: {
									type: "shadow",
								},
							},
							grid: {
								left: "3%",
								right: "3%",
								bottom: "3%",
								containLabel: true,
							},
							xAxis: {
								type: "category",
								axisTick: {
									show: false,
								},
								data: [
									"CPU佔用",
									"記憶體佔用",
									"系統緩衝",
									"記憶體緩衝",
									"系統負載",
								],
							},
							yAxis: {
								type: "value",
								max: 100,
							},
							series: {
								data: [
									{
										name: "CPU佔用",
										value: cpuUse,
										itemStyle: {
											color: "#b3c25a",
										},
									},
									{
										name: "記憶體佔用",
										value: memoryRealUse,
										itemStyle: {
											color: "#67b580",
										},
									},
									{
										name: "系統緩衝",
										value: memoryBufferUse,
										itemStyle: {
											color: "#86ba71",
										},
									},
									{
										name: "記憶體緩衝",
										value: memoryCacheUse,
										itemStyle: {
											color: "#feb041",
										},
									},
									{
										name: "系統負載",
										value: systemLoad,
										itemStyle: {
											color: "#fd7e55",
										},
									},
								],
								type: "bar",
								showBackground: true,
								label: {
									show: true,
									color: "#ffffff",
									formatter: (params) => `${params.data.value}%`,
								},
								backgroundStyle: {
									color: "rgba(180, 180, 180, 0.2)",
								},
							},
						});
					}
					setTimeout(initChart, 2000);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	},
	/* 初始化分類統計 */
	category() {
		const categoryDom = document.querySelector("#category");
		const categoryChart = echarts.init(categoryDom);
		const seriesData = [];
		$(".joe_census__basic-item.category ul li").each((index, item) => {
			seriesData.push({
				name: item.getAttribute("data-name"),
				value: item.getAttribute("data-value"),
			});
		});
		categoryChart.setOption({
			tooltip: {
				trigger: "item",
			},
			series: [
				{
					type: "pie",
					roseType: "area",
					itemStyle: {
						borderRadius: 8,
					},
					data: seriesData,
				},
			],
		});
	},
	/* 初始化評論統計 */
	comment() {
		const latelyDom = document.querySelector("#lately");
		const latelyChart = echarts.init(latelyDom);

		Utils.request({
			url: Joe.BASE_API,
			type: "POST",
			returnRaw: true,
			data: {
				routeType: "comment_lately",
			},
		})
			.then((res) => {
				latelyChart.setOption({
					title: {
						subtext: "單位 數量",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: "#6a7985",
							},
						},
					},
					grid: {
						left: "3%",
						right: "3%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: {
						type: "category",
						axisTick: {
							show: false,
						},
						data: res.categories,
					},
					yAxis: {
						type: "value",
					},
					series: {
						name: "數量",
						itemStyle: {
							normal: {
								color: "#91cc75",
								lineStyle: {
									width: 2,
									color: "#91cc75",
								},
							},
						},
						data: res.series,
						type: "line",
						smooth: true,
					},
				});
			})
			.catch((err) => {
				console.log(err);
			});
	},
	/* 初始化歸檔 */
	archive() {
		let page = 0;
		function initFiling() {
			if ($(".joe_census__filing .button").html() === "loading...") return;

			Utils.request({
				url: Joe.BASE_API,
				type: "POST",
				returnRaw: true,
				data: {
					routeType: "article_filing",
					page: ++page,
				},
			})
				.then((res) => {
					if (!res.length) {
						$(".joe_census__filing .item.load").remove();
						return Qmsg.warning("沒有更多內容了");
					}
					let htmlStr = "";
					res.forEach((item) => {
						htmlStr += `
							<div class="item">
								<div class="tail"></div>
								<div class="head"></div>
								<div class="wrapper">
									<div class="panel">${
	item.date
}<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M21.6 772.8c28.8 28.8 74.4 28.8 103.2 0L512 385.6l387.2 387.2c28.8 28.8 74.4 28.8 103.2 0 28.8-28.8 28.8-74.4 0-103.2L615.2 282.4l-77.6-77.6c-14.4-14.4-37.6-14.4-51.2 0l-77.6 77.6L21.6 669.6c-28.8 28.8-28.8 75.2 0 103.2z" /></svg></div>
									<ol class="panel-body">
										${item.list
		.map(
			(_) =>
				`<li><a rel="noopener noreferrer" target="_blank" href="${_.permalink}">${_.title}</a></li>`
		)
		.join("")}
									</ol>
								</div>
							</div>
						`;
					});
					$("#filing").append(htmlStr);
					$(".joe_census__filing .button").html("載入更多");
				})
				.catch((err) => {
					console.log(err);
				});
		}
		initFiling();
		$(".joe_census__filing .content").on("click", ".panel", function () {
			const panelBox = $(this).parents(".content");
			panelBox.find(".panel").not($(this)).removeClass("in");
			panelBox
				.find(".panel-body")
				.not($(this).siblings(".panel-body"))
				.stop()
				.hide("fast");
			$(this).toggleClass("in").siblings(".panel-body").stop().toggle("fast");
		});
		$(".joe_census__filing .button").on("click", function () {
			initFiling();
			$(this).html("loading...");
		});
	},
};

!function () {
	document.addEventListener("DOMContentLoaded", function () {
		Object.keys(censusContext).forEach((c) => censusContext[c]());
	});
};

