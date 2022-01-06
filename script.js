const form = document.querySelector('form');
const title = document.getElementById('title');
const text = document.getElementById('body');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const obj = {
        testtable_email: title.value,
        testtable_msg: text.value,
    };

    createPost(obj);
});

const createPost = async(data) => {
    submitBtn.disabled = true;
    const res = await fetch("http://localhost:8080/create-post", {
        method: 'POST',
        headers: {
            Accept: "application/json", 
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });


    title.value = "";
    text.value = "";
    submitBtn.disabled = false;
};

