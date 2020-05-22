/*eslint-disable no-undef*/
export default function Focus(element){
    $(document).ready(function () {
                var  value = $(element).val();
                if (!value)
                {  
                    $(element).focus();
                }
})
}