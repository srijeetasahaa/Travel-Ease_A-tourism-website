function openDay(day) {
    var i, tablinks, daycontent;
    
    // Hide all day contents
    daycontent = document.getElementsByClassName("day-content");
    for (i = 0; i < daycontent.length; i++) {
        daycontent[i].classList.remove("active");
    }

    // Remove active class from all tabs
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the clicked day and make its tab active
    document.getElementById("day" + day).classList.add("active");
    tablinks[day - 1].classList.add("active");
}