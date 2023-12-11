async function getUser() { // 로딩 시 사용자 가져오는 함수

    try{

        const res = await axios.get('/users');
        console.log("res : " + res)
        const users = res.data;
        console.log("현재 등록된 사용자 : " + users)
        const list = document.getElementById('list');
        list.innerHTML = '';

        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결

        //Object.keys()
        // 지정한 객체 자신의 모든 열거 가능한 문자열 속성들의 이름으로 구성된 배열을 반환합니다.

        Object.keys(users).map(function (key){
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            console.log("span.textContent : " + span.textContent)
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => { // 수정 버튼 클릭
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name) {
                    return alert('이름을 반드시 입력하셔야 합니다');
                }

                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (err) {
                    console.error(err);
                }

            });

            const remove = document.createElement('button');
            remove.textContent = '삭제';

            remove.addEventListener('click', async ()=>{ // 삭제 버튼 클릭
                try {
                    await axios.delete('/user/' + key);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });

            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log("list : ", list)
            console.log("res.data" , res.data);


        });



    }catch (err){
        console.error(err);
    }

}


window.onload = getUser; // 화면 로딩 시 getUser 호출




// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    console.log(name)
    if (!name) {
        return alert('이름을 입력하세요');
    }
    try {
        await axios.post('/user', { name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});