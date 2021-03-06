// 비밀번호 수정 시, 데이터베이스 수정.
module.exports = function(req, res) {

    var new_password = req.body.new_password;

    console.log('/modify_password 패스 요청됨.');

    console.log('req.user의 정보');
    console.dir(req.user);

    // 인증 안된 경우
    if (!req.user) {
        console.log('사용자 인증 안된 상태임.');
        res.redirect('/index_signin');
        return;

    } else {

        if (!req.session.check_changepwd) {
            console.log('현재 비밀번호 확인되지 않음.');
            res.redirect('/current_password_confirm_changepwd');
            return;
        }

        console.log('사용자 인증된 상태임.');
		console.log('req.session : ', req.session);

        var database = req.app.get('database');

        if (database.db) {
            console.log('데이터베이스 연결 성공.');


            var tmp = new database.user_account_model({
                'password': new_password
            });

            database.user_account_model.update({
                id: req.user.id
            }, {
                $set: {
                    hashed_password: tmp.hashed_password,
                    salt: tmp.salt,
                    updated_at: tmp.created_at
                }
            }, function(err, result) {
                if (err) {
                    console.log('update 함수 사용 중 에러');
                    res.redirect('/error');
                    return;
                }
                console.log(result);
                console.log('비밀번호 변경 완료.');
            });
        } else {
            console.log('데이터베이스 연결 실패.');
            res.redirect('/error');
            return;
        }

        req.logout();
        res.redirect('/modify_password_success');
        return;
    }
}
