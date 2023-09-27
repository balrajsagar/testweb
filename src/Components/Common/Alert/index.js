// import Swal from 'sweetalert2'

// export default function Alert(type, message) {
//     switch (type) {
//         case 'success':
//             return Swal.fire('Success', message, 'success')
//         case 'error':
//             return Swal.fire('Error', message, 'error')
//         case 'warning':
//             return Swal.fire('Warning', message, 'warning')
//         default :
//             return Swal.fire('Error', message, 'error')
//     }
// }
import swal from 'sweetalert';

export default function Alert(type, message) {
    switch (type) {
        case 'success':
            return swal('Success', message, 'success')
        case 'error':
            return swal('Error', message, 'error')
        case 'warning':
            return swal('Warning', message, 'warning')
        default :
            return swal('Error', message, 'error')
    }
}