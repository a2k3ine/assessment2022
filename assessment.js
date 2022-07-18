'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
         // TODO ボタンのonclick() 処理を呼び出す
         assessmentButton.onclick();
       }
    };
    
//assessmentButton.onclick = function (){
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    //ガード句
    if (userName.length === 0){
        return;
    }
    //console.log(userName);
    //console.log(assessment(userName));


    // 診断結果表示エリアの作成
    resultDivided.innerText = '';//表示を消す
    const header = document.createElement('h3');
    header.innerText = '診断結果';//文字
    resultDivided.appendChild(header);//表示する

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;//診断した結果
    resultDivided.appendChild(paragraph);//表示する

    // ツイートエリアの作成
    tweetDivided.innerText = '';//表示を消す
    
    //ツイートボタンを作成し表示する
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('あなたのいいところ診断') + '&ref_src=twsrc%5Etfw';
    
    //const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ診断&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);//リンクの属性
    //anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.className = 'twitter-hashtag-button';
    //anchor.setAttribute('data-text', '診断結果の文章が入る予定の場所です。');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ診断';
    tweetDivided.appendChild(anchor);//表示する
    
    // widgets.js の設定 scriptタグ
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

//console.log(answers[0]);

/**
 * 名前からいいところ診断結果を返す関数です。
 * @param {string} userName
 * @returns {string} 診断結果
 */

function assessment(userName){
    // 文字の番号の合計値を求める
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //console.log(sumOfCharCode);
    //indexは配列の添え字
    const index = sumOfCharCode % answers.length;
    let result = answers[index]; 
    //用意したresultの下でresultの更新 再代入 入力した名前がuserName変数に入っているのでこれに変える
    result = result.replaceAll('{userName}',userName)
    return result;
}
    //まだ確認ができないのでuserNameを太郎に書き換え、確認だけする。
    //console.log(assessment('ONちゃん'));

    console.assert(
        assessment('太郎') ===
          '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
      );

    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
      );
