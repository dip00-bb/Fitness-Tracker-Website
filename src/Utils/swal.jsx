import Swal from 'sweetalert2';




export const loginSuccessSwal = () => {
    Swal.fire({
        title: 'Welcome Back! 💪',
        text: 'You have successfully logged in.',
        icon: 'success',
        background: '#1e1e1e',
        color: '#fff',
        iconColor: '#ef4444',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Continue',
        customClass: {
            popup: 'rounded-xl',
            title: 'text-xl font-semibold',
            confirmButton: 'text-white'
        },
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true
    });
};


export const registerSuccessSwal = (name = 'FitNex Member') => {
    Swal.fire({
        title: `Welcome, ${name}! 🎉`,
        text: 'Your account has been successfully created.',
        icon: 'success',
        background: '#1e1e1e',
        color: '#fff',
        iconColor: '#ef4444',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Get Started',
        customClass: {
            popup: 'rounded-xl',
            title: 'text-xl font-semibold',
            confirmButton: 'text-white'
        },
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
    });
};



export const errorSwal = (message = "Something went wrong!") => {
    Swal.fire({
        title: 'Oops! ❌',
        text: message,
        icon: 'error',
        background: '#1e1e1e',
        color: '#fff',
        iconColor: '#ef4444',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Try Again',
        customClass: {
            popup: 'rounded-xl',
            title: 'text-xl font-semibold',
            confirmButton: 'text-white'
        }
    });
};
