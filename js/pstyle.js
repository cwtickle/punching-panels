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
const jstyleX = [100, 200, 300, 400, 500, 150, 250, 350, 450, 150, 250, 350, 450, 100, 200, 300, 400, 500];
const jstyleY = [110, 110, 110, 110, 110, 170, 170, 170, 170, 230, 230, 230, 230, 290, 290, 290, 290, 290];
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
function pstyleTitleInit() {

	// キリズマ拡張クレジット
	multiAppend(divRoot,
		createCss2Button(`lnkCreditP`, `Punching◇Panels ${g_PanpaneVersion}`, _ => openLink(`https://github.com/cwtickle/punching-panels`), {
			x: g_sWidth - 175, y: 0, w: 175, h: 20, siz: 12, align: C_ALIGN_RIGHT,
		}, g_cssObj.button_Setting),
	);
}
g_customJsObj.title.push(pstyleTitleInit);

// カスタムキー定義
const pstyle18LibData = `
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
`;
g_presetObj.keysDataLib.push(pstyle18LibData);
g_rootObj.imgType = `panels,svg,true,0`;
g_rootObj.arrowJdgY = -160;

// デフォルト配列のコピー (g_keyObj.aaa_X から g_keyObj.aaa_Xd を作成)
const keyCtrlNameP = Object.keys(g_keyObj).filter(val => val.startsWith(`keyCtrl18p`));
keyCtrlNameP.forEach(property => g_keyObj[`${property}d`] = copyArray2d(g_keyObj[property]));

[`color18p`, `shuffle18p`].forEach(type => {
	const tmpName = Object.keys(g_keyObj).filter(val => val.startsWith(type) && val.endsWith(`_0`));
	tmpName.forEach(property => g_keyObj[`${property.slice(0, -2)}`] = g_keyObj[property].concat());
});

// 矢印モーション初期定義
g_rootObj.arrowMotion_data = `
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
`;

// ステップゾーンの位置変更 (ノーツはCSS側で制御)
function pstyleMainInit() {
	if ([`18p`].includes(g_keyObj.currentKey)) {
		for (let i = 0; i < 18; i++) {
			if (document.getElementById(`stepRoot${i}`)) {
				document.getElementById(`stepRoot${i}`).style.left = `${jstyleX[i]}px`;
				document.getElementById(`stepRoot${i}`).style.top = `${jstyleY[i]}px`;
			}
		}
	}
}
g_customJsObj.main.push(pstyleMainInit);

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