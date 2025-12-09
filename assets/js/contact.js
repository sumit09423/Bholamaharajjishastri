$(function () {
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        var name = $('#form_name').val();
        var phone = $('#form_phone').val();
        var date = $('input[name="date"]').val();
        var pujaType = $('select[name="type of puja"]').val();
        var message = $('#form_message').val();

        // Validate required fields
        if (!name || !phone || !date || !pujaType || !message) {
            var alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-hidden="true"></button>Please fill in all required fields.</div>';
            $('#contact-form').find('.messages').html(alertBox);
            return false;
        }

        // Validate date is in the future
        var selectedDate = new Date(date);
        var today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare dates only
        selectedDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            var alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-hidden="true"></button>Please select a future date. Past dates are not allowed.</div>';
            $('#contact-form').find('.messages').html(alertBox);
            $('#form_date').focus();
            return false;
        }

        // Format puja type name (convert kebab-case to readable format)
        var pujaTypeNames = {
            'annapraashan-pooja': 'Annapraashan Pooja',
            'bhoomi-pooja': 'Bhoomi Pooja',
            'brihaspati-vrat-udyapan-pooja': 'Brihaspati Vrat Udyapan Pooja',
            'ganesh-pooja': 'Ganesh Pooja',
            'satyanarayan-pooja': 'Satyanarayan Pooja',
            'new-vehicle-pooja': 'New Vehicle Puja',
            'office-opening-pooja': 'Office Opening Puja',
            'haldi-ceremony': 'Haldi Ceremony',
            'yagnopavit-sanskar': 'Yagnopavit Sanskar',
            'vastu-shanti-pooja': 'Vastu Shanti Puja',
            'vishwakarma-pooja': 'Vishwakarma Puja'
        };
        var pujaTypeName = pujaTypeNames[pujaType] || pujaType;

        // Create WhatsApp message
        var whatsappMessage = "Namaste Pandit Bhola Maharaj (Shastri Ji)!%0A%0A*New Puja Booking Request*%0A%0A*Customer Details:*%0A• Name: " + encodeURIComponent(name) + 
            "%0A• Phone: " + encodeURIComponent(phone) + 
            "%0A• Preferred Date: " + encodeURIComponent(date) + 
            "%0A• Puja Type: " + encodeURIComponent(pujaTypeName) + 
            "%0A• Message: " + encodeURIComponent(message) + 
            "%0A%0A_Please contact the customer to confirm the booking._";

        // Store form data in sessionStorage to pass to thankyou page
        sessionStorage.setItem('bookingData', JSON.stringify({
            name: name,
            phone: phone,
            date: date,
            pujaType: pujaTypeName,
            message: message
        }));

        // Open WhatsApp in new tab with pre-filled message
        var whatsappURL = "https://wa.me/+919866756883?text=" + whatsappMessage;
        window.open(whatsappURL, '_blank');

        // Redirect to thank you page after a short delay
        setTimeout(function() {
            window.location.href = "thankyou.html";
        }, 500);

        return false;
    });
});