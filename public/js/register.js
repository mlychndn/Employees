
const register = async (firstName, lastName, email, organization, password, passwordConfirm)=> {
    try {
        
        console.log(firstName, lastName, email, organization, password, passwordConfirm);
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/signUp',
            data: {
                firstName,
                lastName,
                emailId: email,
                organizationName: organization,
                password,
                passwordConfirm
                }
        })
        console.log(res);
      } catch (error) {
        console.log(error);
    }
    
};







document.querySelector('#survey-form').addEventListener('submit', e=> {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const organization = document.getElementById('organization').value;
    const password = document.getElementById('pwd').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    register(firstName, lastName, email, organization, password, passwordConfirm);

    
})









