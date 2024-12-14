'use strict';
/**
 * Dancing☆Onigiri カスタム用jsファイル
 * [for Punching◇Panels]
 * 
 * Source by tickle
 * Created: 2022/01/28
 * Revised: 2022/08/15
 * Source Version: Ver 1.4.0
 * 
 * https://github.com/cwtickle/punching-panels
 */
const g_PanpaneVersion = `Ver 1.4.0`;

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

g_lblNameObj.dancing = `PUNCHING`;
g_lblNameObj.star = `◇`;
g_lblNameObj.onigiri = `PANELS`;
g_lblNameObj[`u_key`] = `panel`;
g_lblNameObj[`u_k-`] = `p-`;
g_lblNameObj.Reverse = `Dynamic`;
g_lblNameObj[`u_Reverse`] = `Dynamic`;
g_lang_msgObj.Ja.reverse = `パネルの移動パターンを変更します。`;
g_lang_msgObj.En.reverse = `Change the panel movement pattern.`;
g_rootObj.arrowEffectUse = `false,ON`;

/**
 * タイトル画面の割込み処理
 */
g_customJsObj.title.push(() => {
	// 拡張クレジット
	multiAppend(divRoot,
		createCss2Button(`lnkCreditP`, `Punching◇Panels ${g_PanpaneVersion}`, _ => openLink(`https://github.com/cwtickle/punching-panels`), {
			x: g_btnWidth() + g_btnX() - 175, y: 0, w: 175, h: 20, siz: 12, align: C_ALIGN_RIGHT,
		}, g_cssObj.button_Setting),
	);
});

/**
 * カスタムキー定義
 */
g_presetObj.keysDataLib.push(`
|keyName18p=18,panel|
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
g_rootObj.imgType = `panels,svg,true,0`;
g_rootObj.arrowJdgY = -160;

// デフォルト配列のコピー (g_keyObj.aaa_X から g_keyObj.aaa_Xd を作成)
const keyCtrlNameP = Object.keys(g_keyObj).filter(val => val.startsWith(`keyCtrl18p`) || val.startsWith(`keyCtrl36p`));
keyCtrlNameP.forEach(property => g_keyObj[`${property}d`] = copyArray2d(g_keyObj[property]));

[`color18p`, `shuffle18p`, `color36p`, `shuffle36p`].forEach(type => {
	const tmpName = Object.keys(g_keyObj).filter(val => val.startsWith(type) && val.endsWith(`_0`));
	tmpName.forEach(property => g_keyObj[`${property.slice(0, -2)}`] = g_keyObj[property].concat());
});

// 矢印モーション初期定義
g_customJsObj.preloading.push(() => {
	g_rootObj.arrowMotion_data = pMotion[g_keyObj.currentKey];
});

// ステップゾーンの位置変更 (ノーツはCSS側で制御)
g_customJsObj.main.push(() => {
	if ([`18p`, `36p`].includes(g_keyObj.currentKey)) {
		for (let i = 0; i < g_keyObj[`keyCtrl${g_keyObj.currentKey}_0`].length; i++) {
			if (document.getElementById(`stepRoot${i}`)) {
				document.getElementById(`stepRoot${i}`).style.left = `${pstyleX[g_keyObj.currentKey][i]}px`;
				document.getElementById(`stepRoot${i}`).style.top = `${pstyleY[g_keyObj.currentKey][i]}px`;
			}
		}
	}
});

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