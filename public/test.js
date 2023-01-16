function send(){
    //ajaxでのcsrfトークン送信
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //アップロードファイルの入力値を取得する。
    var fileData = document.getElementById("file").files[0];

    //フォームデータを作成する。(送信するデータ)
    var form = new FormData();
    //画像キャッシュの削除(画像URLにユニークなクエリを付与)
    var timestamp = new Date().getTime();

    //フォームデータにテキストの内容、アップロードファイルの内容を格納する。
    form.append( "file", fileData );
    //ポスト送信する。
    $.ajax({
        type: 'post',
        url: '/create/create',
        // url: '/test',
        data: form,
        processData : false,
        contentType : false,

        //成功の場合、以下を行う。
        success: function(data){
            $("#main").empty();
            $("#main").append(data);
            $('#image').attr('src', $('#image').attr('src')+'?'+timestamp);
        },

        //失敗の場合、以下を行う。
        error : function(){
            alert('失敗です。');
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        }
    });
}


var allow_exts = new Array('jpg', 'jpeg', 'png','gif');
// changeイベントで呼び出す関数
function handleFileSelect(){
    const sizeLimit = 1024 * 1024 * 10;　// 制限サイズ
    const fileInput = document.getElementById('file'); // input要素
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > sizeLimit) {
            // ファイルサイズが制限以上
            alert('ファイルサイズは10MB以下にしてください'); // エラーメッセージを表示
            fileInput.value = ''; // inputの中身をリセット
            return; // この時点で処理を終了する
        }

        if (!checkExt(files[i].name)) {
            alert(files[i].name+'はアップロードできません');
            fileInput.value = ''; // inputの中身をリセット
            return false;
        }
    }

    $('#button').attr('disabled', false);
//チェックを通ったらtrueを返す
return true;
}
//アップロード予定のファイル名の拡張子が許可されているか確認する関数
function checkExt(filename)
{
	//比較のため小文字にする
	var ext = getExt(filename).toLowerCase();
	//許可する拡張子の一覧(allow_exts)から対象の拡張子があるか確認する
	if (allow_exts.indexOf(ext) === -1) return false;
	return true;
}
//ファイル名から拡張子を取得する関数
function getExt(filename)
{
	var pos = filename.lastIndexOf('.');
	if (pos === -1) return '';
	return filename.slice(pos + 1);
}


$('#button').attr('disabled', true);

$('#main').on('DOMSubtreeModified propertychange',function(){
    $('#button').attr('disabled', true);

}
)