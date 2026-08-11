'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [for Punching◇Panels]
 * 
 * Source by tickle
 * Created: 2022/01/28
 * Revised: 2026/08/11
 * Source Version: Ver 2.0.1
 * 
 * https://github.com/cwtickle/punching-panels
 */
const g_PanpaneVersion = `Ver 2.0.1`;

g_customJsObj.preTitle.push(() => {

	// 他系統(Kirizma等)と共存できるよう、「panel系以外」ではなく「本当に標準に戻った」場合だけ復元する
	const isPanelKey = key => [`18p`, `36p`].includes(key);
	const isKirizmaKey = key => key.endsWith(`k`);
	const isSpecialKey = key =>
		(hasVal(g_rootObj.specialKey) ? g_rootObj.specialKey.split(`,`) : []).concat([`9t`, `18t`]).includes(key);
	const isDynamicKey = key => [`18p`, `36p`, `9t`, `18t`].includes(key);
	const isStandardKey = key => !isPanelKey(key) && !isKirizmaKey(key) && !isSpecialKey(key);

	if (g_headerObj.keyLists.some(isPanelKey)) {

		// 位置の設定、ゲーム名の変更
		const pstyleX = {
			'18p': [
				100, 200, 300, 400, 500,
				150, 250, 350, 450,
				150, 250, 350, 450,
				100, 200, 300, 400, 500,
			],
			'36p': [
				100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
				150, 250, 350, 450, 650, 750, 850, 950,
				150, 250, 350, 450, 650, 750, 850, 950,
				100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
			],
		};
		const pstyleY = {
			'18p': [
				110, 110, 110, 110, 110,
				170, 170, 170, 170,
				230, 230, 230, 230,
				290, 290, 290, 290, 290,
			],
			'36p': [
				110, 110, 110, 110, 110, 110, 110, 110, 110, 110,
				170, 170, 170, 170, 170, 170, 170, 170,
				230, 230, 230, 230, 230, 230, 230, 230,
				290, 290, 290, 290, 290, 290, 290, 290, 290, 290,
			],
		};
		const pMotion = {
			'18p': `
0,0,j11_org,j11
0,1,j12_org,j12
0,2,j13_org,j13
0,3,j14_org,j14
0,4,j15_org,j15
0,5,j21_org,j21
0,6,j22_org,j22
0,7,j23_org,j23
0,8,j24_org,j24
0,9,j31_org,j31
0,10,j32_org,j32
0,11,j33_org,j33
0,12,j34_org,j34
0,13,j41_org,j41
0,14,j42_org,j42
0,15,j43_org,j43
0,16,j44_org,j44
0,17,j45_org,j45
	`,
			'36p': `
0,0,j11_org,j11
0,1,j12_org,j12
0,2,j13_org,j13
0,3,j14_org,j14
0,4,j15_org,j15
0,5,j16_org,j16
0,6,j17_org,j17
0,7,j18_org,j18
0,8,j19_org,j19
0,9,j1a_org,j1a
0,10,j21_org,j21
0,11,j22_org,j22
0,12,j23_org,j23
0,13,j24_org,j24
0,14,j26_org,j26
0,15,j27_org,j27
0,16,j28_org,j28
0,17,j29_org,j29
0,18,j31_org,j31
0,19,j32_org,j32
0,1020,j33_org,j33
0,1021,j34_org,j34
0,1022,j36_org,j36
0,1023,j37_org,j37
0,1024,j38_org,j38
0,1025,j39_org,j39
0,1026,j41_org,j41
0,1027,j42_org,j42
0,1028,j43_org,j43
0,1029,j44_org,j44
0,1030,j45_org,j45
0,1031,j46_org,j46
0,1032,j47_org,j47
0,1033,j48_org,j48
0,1034,j49_org,j49
0,1035,j4a_org,j4a
	`,
		};

		// タイトルロゴ・ラベル文言は「全difficultyがpanel系keyLabelの場合のみ」書き換える
		if (g_headerObj.keyLists.every(isPanelKey)) {
			g_lblNameObj.dancing = `PUNCHING`;
			g_lblNameObj.star = `◇`;
			g_lblNameObj.onigiri = `PANELS`;
		}

		// 標準側の元の値を退避
		const origArrowEffectUseOrg = g_headerObj.arrowEffectUseOrg;
		const origStepAreaUse = g_headerObj.stepAreaUse;
		const origEffectUse = g_headerObj.effectUse;
		const origCamoufrageUse = g_headerObj.camoufrageUse;
		const origSwappingUse = g_headerObj.swappingUse;
		let savedStepArea, savedEffect, savedCamoufrage, savedSwapping, savedDArrowEffect;
		const origArrowJdgY = g_diffObj.arrowJdgY;

		// ラベル文言も標準側を退避
		const origLblReverse = g_lblNameObj.Reverse;
		const origLblUReverse = g_lblNameObj[`u_Reverse`];
		const origMsgReverse = g_msgObj.reverse;

		const panelReverseMsg = { Ja: `パネルの移動パターンを変更します。`, En: `Change the panel movement pattern.` };

		// 標準側は core が既に解析した内容をそのまま退避
		const origImgTypeArr = g_headerObj.imgType;
		const origImgTypeNames = g_keycons.imgTypes;

		// panels専用の画像セットは core の解析ルートを一切通さず、ここだけで完結させる
		const panelsImgTypeArr = [{
			name: `panels`, extension: `svg`, rotateEnabled: true, flatStepHeight: 0, remoteDir: ``,
		}];
		const panelsImgTypeNames = [`panels`];

		// file://実行時はupdateImgType()自体が無効化されているため、
		// C_IMG_AASD / C_IMG_C だけ手動で差し替える（./js/lib/danoni_localbinary.js は標準版のまま使う）
		const origLocalImg = { C_IMG_AASD, C_IMG_C };
		const panelLocalImg = {
			C_IMG_AASD: `data:image/svg+xml,${encodeURIComponent('<svg id="aaShadow" data-name="aaShadow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs><style>.cls-1{stroke:#000;stroke-miterlimit:10;}</style></defs><polygon class="cls-1" points="177.5 25.5 49.5 180.5 6.5 274.5 -0.5 347.5 13.5 416.5 82 500 410.85 499 479.85 418 500 332 480 250 438 162 333 25 177.5 25.5"/></svg>')}`,
			C_IMG_C: `data:image/svg+xml,${encodeURIComponent('<svg id="c" data-name="c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M495,5V495H5V5H495m5-5H0V500H500V0Z"/></svg>')}`,
		};

		const orgHashTag = g_headerObj.hashTag;

		// 現在選択中のkeyLabelに応じて都度切り替える
		g_customJsObj.difficulty.push(() => {
			if (!isPanelKey(g_keyObj.prevKey) && isPanelKey(g_keyObj.currentKey)) {

				// panelsに入る直前の実際の値を退避
				savedStepArea = g_stateObj.stepArea;
				savedEffect = g_stateObj.effect;
				savedCamoufrage = g_stateObj.camoufrage;
				savedSwapping = g_stateObj.swapping;
				savedDArrowEffect = g_stateObj.d_arroweffect;

				// パンパネで起動しない設定を無効化
				g_headerObj.arrowEffectUse = false;
				g_stateObj.d_arroweffect = C_FLG_ON;
				g_headerObj.stepAreaUse = false;
				g_headerObj.effectUse = false;
				g_headerObj.camoufrageUse = false;
				g_headerObj.swappingUse = false;

				g_diffObj.arrowJdgY = -160;

				// ラベル文言をpanel用に切替
				g_lblNameObj.Reverse = `Dynamic`;
				g_lblNameObj[`u_Reverse`] = `Dynamic`;
				g_msgObj.reverse = panelReverseMsg[g_localeObj.val] ?? panelReverseMsg.Ja;
				lblReverse.innerText = `Dynamic`;
				btnReverse.innerText = `Dynamic:${getStgDetailName(g_stateObj.reverse)}`;
				lblReverse.title = g_msgObj.reverse;

				g_headerObj.imgType = panelsImgTypeArr;
				g_keycons.imgTypes = panelsImgTypeNames;

				if (hasVal(orgHashTag)) {
					if (!orgHashTag.includes(`#punpane`)) {
						g_headerObj.hashTag = orgHashTag + ` #punpane`;
					}
				} else {
					g_headerObj.hashTag = `#punpane`;
				}

				if (g_imgType !== `panels`) {
					g_imgType = `panels`;
					g_stateObj.rotateEnabled = panelsImgTypeArr[0].rotateEnabled;
					g_stateObj.flatStepHeight = panelsImgTypeArr[0].flatStepHeight;

					if (g_isFile) {
						// file://実行時: 差分のある2画像だけ手動で切替
						C_IMG_AASD = panelLocalImg.C_IMG_AASD;
						C_IMG_C = panelLocalImg.C_IMG_C;
						g_imgObj.cShadow = C_IMG_AASD;
						g_imgObj.c = C_IMG_C;
						g_imgObj.cStep = C_IMG_C;
						g_imgObj.cShadowStep = C_IMG_AASD;
						g_imgObj.cStepHit = C_IMG_C;
					} else {
						updateImgType(panelsImgTypeArr[0]);
					}
				}
			} else if (isPanelKey(g_keyObj.prevKey) && isStandardKey(g_keyObj.currentKey)) {

				g_diffObj.arrowJdgY = origArrowJdgY;

				g_headerObj.imgType = origImgTypeArr;
				g_keycons.imgTypes = origImgTypeNames;

				if (hasVal(orgHashTag)) {
					g_headerObj.hashTag = orgHashTag;
				} else {
					delete g_headerObj.hashTag;
				}

				if (g_imgType !== origImgTypeNames[0]) {
					g_imgType = origImgTypeNames[0];
					g_stateObj.rotateEnabled = origImgTypeArr[0].rotateEnabled;
					g_stateObj.flatStepHeight = origImgTypeArr[0].flatStepHeight;

					if (g_isFile) {
						C_IMG_AASD = origLocalImg.C_IMG_AASD;
						C_IMG_C = origLocalImg.C_IMG_C;
						g_imgObj.cShadow = C_IMG_AASD;
						g_imgObj.c = C_IMG_C;
						g_imgObj.cStep = C_IMG_C;
						g_imgObj.cShadowStep = C_IMG_AASD;
						g_imgObj.cStepHit = C_IMG_C;
					} else {
						updateImgType(origImgTypeArr[0]);
					}
				}
			}

			// Reverseラベルはpstyle専有のフィールドなので、panelsを離れたら
			// 遷移先(標準/kirizma問わず)に関係なく必ず復元する
			if (isDynamicKey(g_keyObj.prevKey) && !isDynamicKey(g_keyObj.currentKey)) {
				g_lblNameObj.Reverse = origLblReverse;
				g_lblNameObj[`u_Reverse`] = origLblUReverse;
				g_msgObj.reverse = origMsgReverse;
				lblReverse.innerText = origLblReverse;
				btnReverse.innerText = `${origLblReverse}:${getStgDetailName(g_stateObj.reverse)}`;
				lblReverse.title = origMsgReverse;

				g_headerObj.arrowEffectUse = origArrowEffectUseOrg;
				g_headerObj.stepAreaUse = origStepAreaUse;
				g_headerObj.effectUse = origEffectUse;
				g_headerObj.camoufrageUse = origCamoufrageUse;
				g_headerObj.swappingUse = origSwappingUse;
				g_stateObj.stepArea = savedStepArea;
				g_stateObj.effect = savedEffect;
				g_stateObj.camoufrage = savedCamoufrage;
				g_stateObj.swapping = savedSwapping;
				g_stateObj.d_arroweffect = savedDArrowEffect;
				deleteDiv(divRoot, `lnkCreditP`);
			}

			// オフセットは18p<->36pの切替でも変わるため、系統の出入り判定とは無関係に、
			// panels選択中は常に(現在のkeyLabelに応じて)再計算し続ける
			if (isPanelKey(g_keyObj.currentKey)) {
				if (g_stateObj.playWindow.endsWith(`SideScroll`)) {
					document.documentElement.style.setProperty(`--panel-offset-x`, `0px`);
				} else {
					const panelOffsetX = (g_sWidth - g_keyObj[`minWidth${g_keyObj.currentKey}`]) / 2;
					document.documentElement.style.setProperty(`--panel-offset-x`, `${panelOffsetX}px`);
				}

				// パンパネクレジット
				if (!g_headerObj.keyLists.every(isPanelKey)) {
					if (document.getElementById(`lnkCreditP`) === null) {
						multiAppend(divRoot,
							createCss2Button(`lnkCreditP`, `Punching◇Panels ${g_PanpaneVersion}`, _ => openLink(`https://github.com/cwtickle/punching-panels`), {
								x: g_btnX(), y: 30, w: g_btnWidth(1 / 4), h: 20, siz: 12,
							}, g_cssObj.button_Setting),
						);
					}
				}
			} else if (isPanelKey(g_keyObj.prevKey)) {
				// panelsから離れた瞬間だけ0に戻す(以後は他系統なので触らない)
				document.documentElement.style.setProperty(`--panel-offset-x`, `0px`);
			}
		});

		/**
		 * タイトル画面の割込み処理
		 */
		g_customJsObj.title.push(() => {
			// 拡張クレジット
			multiAppend(divRoot,
				createCss2Button(`lnkCreditP`, `Punching◇Panels ${g_PanpaneVersion}`, _ => openLink(`https://github.com/cwtickle/punching-panels`), {
					x: g_btnWidth() + g_btnX() - 175, y: g_headerObj.keyLists.some(isKirizmaKey) ? 20 : 0,
					w: 175, h: 20, siz: 12, align: C_ALIGN_RIGHT,
				}, g_cssObj.button_Setting),
			);
		});

		// デフォルト配列のコピー (g_keyObj.aaa_X から g_keyObj.aaa_Xd を作成)
		const keyCtrlNameP = Object.keys(g_keyObj).filter(val => val.startsWith(`keyCtrl18p`) || val.startsWith(`keyCtrl36p`));
		keyCtrlNameP.forEach(property => g_keyObj[`${property}d`] = copyArray2d(g_keyObj[property]));

		[`color18p`, `shuffle18p`, `color36p`, `shuffle36p`].forEach(type => {
			const tmpName = Object.keys(g_keyObj).filter(val => val.startsWith(type) && val.endsWith(`_0`));
			tmpName.forEach(property => g_keyObj[`${property.slice(0, -2)}`] = g_keyObj[property].concat());
		});

		// 矢印モーション初期定義
		g_customJsObj.preloading.push(() => {
			g_rootObj.arrowMotion_data = isPanelKey(g_keyObj.currentKey)
				? pMotion[g_keyObj.currentKey]
				: undefined;
		});

		// SideScroll時のスケール調整
		g_customJsObj.loading.push(() => {
			if (isPanelKey(g_keyObj.currentKey)) {
				if (g_stateObj.playWindow.endsWith(`SideScroll`)) {
					g_workObj.scale = Math.min(g_sHeight / g_keyObj[`minWidth${g_keyObj.currentKey}`], 1);
				}
			}
		});

		// ステップゾーンの位置変更 (ノーツはCSS側で制御)
		g_customJsObj.main.push(() => {
			if (isPanelKey(g_keyObj.currentKey)) {
				const panelOffsetX = (g_sWidth - g_keyObj[`minWidth${g_keyObj.currentKey}`]) / 2;
				for (let i = 0; i < g_keyObj[`keyCtrl${g_keyObj.currentKey}_0`].length; i++) {
					if (document.getElementById(`stepRoot${i}`)) {
						document.getElementById(`stepRoot${i}`).style.left = `${pstyleX[g_keyObj.currentKey][i] + panelOffsetX}px`;
						document.getElementById(`stepRoot${i}`).style.top = `${pstyleY[g_keyObj.currentKey][i]}px`;
					}
				}
			}
		});
	}
});

/**
 * カスタムキー定義
 */
g_presetObj.keysDataLib.push(`
|keyName18p=18,panel|
|movLock18p=true|
|initManual18p=true|
|keyCtrl18p=
D7,D8,D9,D0,Minus,U,I,O,P,J,K,L,Semicolon,N,M,Comma,Period,Slash
D2,D3,D4,D5,D6,W,E,R,T,S,D,F,G,Z,X,C,V,B
|
|chara18p=aa,ab,ac,ad,ae,ba,bb,bc,bd,ca,cb,cc,cd,da,db,dc,dd,de$18p_0|
|color18p=0,1,2,3,4,0,1,3,4,0,1,3,4,0,1,2,3,4$18p_0|
|shuffle18p=0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,3/0,1,2,3,4,0,1,3,4,0,1,3,4,0,1,2,3,4/0,1,2,3,4,0,1,3,4,4,3,1,0,4,3,2,1,0$18p_0|
|stepRtn18p=c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c$18p_0|
|minWidth18p=650|

|keyName36p=36,panel|
|movLock36p=true|
|initManual36p=true|
|keyCtrl36p=
D2,D3,D4,D5,D6,D7,D8,D9,D0,Minus,W,E,R,T,U,I,O,P,S,D,F,G,J,K,L,Semicolon,Z,X,C,V,B,N,M,Comma,Period,Slash
D1,D2,D3,D4,D5,D7,D8,D9,D0,Minus,Q,W,E,R,U,I,O,P,A,S,D,F,J,K,L,Semicolon,ShiftLeft,Z,X,C,V,N,M,Comma,Period,Slash
|
|chara36p=aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ba,bb,bc,bd,bf,bg,bh,bi,ca,cb,cc,cd,cf,cg,ch,ci,da,db,dc,dd,de,df,dg,dh,di,dj$36p_0|
|color36p=0,1,2,3,4,0,1,2,3,4,0,1,3,4,0,1,3,4,0,1,3,4,0,1,3,4,0,1,2,3,4,0,1,2,3,4$36p_0|
|shuffle36p=0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1$36p_0|
|stepRtn36p=c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c$36p_0|
|minWidth36p=1200|
`);

// ライセンス原文、以下は削除しないでください
/*-----------------------------------------------------------*/
/*
MIT License

Copyright (c) 2022 tickle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*-----------------------------------------------------------*/