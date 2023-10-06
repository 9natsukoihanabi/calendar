window.onload = function() {
  function updateDateTime() {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();

      let hours = now.getHours();
      let greeting;
      if (hours >= 6 && hours < 12) {
          bg = "morning1.jpg";
          greeting = "---- Good Morning ----";
      } else if (hours >= 12 && hours < 18) {
          bg = "afternoon1.jpg";
          greeting = "---- Good Afternoon ----" ;
      } else if (hours >= 18 && hours < 24) {
          bg = "evening1.jpg";
          greeting = "---- Good Evening ----" ;
      } else {
          bg = "anime6.jpeg";
          greeting = '---- Good Night ----'
      }

      document.body.style.backgroundImage = `url('${bg}')`;

      if (document.getElementById('greeting').textContent != 'Happy Birthday!!!!!!!!!'){
      document.getElementById('greeting').textContent = greeting;
      }

      const ampm = hours >= 12 ? 'PM' : 'AM';  // Determine AM/PM
      hours = hours % 12;  // Convert hours to 12-hour format
      hours = hours ? hours : 12;  // The hour '0' should be '12'

      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      document.getElementById('currentTime').textContent = `${day}, ${month} ${date} - ${hours}:${minutes}:${seconds} ${ampm}`;
}

    function addBeeIcons() {
        const now = new Date();
        const date = now.getDate();
        // Get all the table cells
        let cells = document.querySelectorAll('#calendar td');
        // Loop through the first 20 cells and add the bee icon
        for(let i = 0; i < date; i++) {
          if(cells[i].querySelector('img') === null) {
            cells[i].innerHTML += '<img src="bee.webp" class="icon">';
          }
        }
    }

    updateDateTime();
    addBeeIcons();
    setInterval(updateDateTime, 1000);  // Update every second


    function toggleIcon(event) {
        // Check if the clicked element is an image within a table cell
        const target = event.target;
        if (target.tagName === 'IMG' && target.parentNode.tagName === 'TD') {
            const currentSrc = target.getAttribute('src');
                if (parseFloat(getComputedStyle(calendar).opacity) > 0.1) {
            // Only toggle if the current icon is a bee or an angry icon
            if (currentSrc === 'bee.webp') {
                target.setAttribute('src', 'angry.webp');
            } else if (currentSrc === 'angry.webp') {
                target.setAttribute('src', 'bee.webp');
            } else if (currentSrc === 'birthday.png') {
                greeting = 'Happy Birthday!!!!!!!!!'
                if (document.getElementById('greeting').textContent != 'Happy Birthday!!!!!!!!!'){
                document.getElementById('greeting').textContent = greeting;
              } else {
                document.getElementById('greeting').textContent = ''
              }
            }
        }
    }
}
// Add event listener to the calendar
document.getElementById('calendar').addEventListener('click', toggleIcon);

}

let currentOpacity = 0;  // Starting opacity

function adjustOpacity(direction) {
    if (direction === "up" && currentOpacity < 0.8) {
        currentOpacity += 0.01;
    } else if (direction === "down" && currentOpacity > 0) {
        currentOpacity -= 0.01;
    }

    // Ensure opacity stays within 0 and 1
    currentOpacity = Math.max(0, Math.min(1, currentOpacity));
    document.getElementById('calendar').style.opacity = currentOpacity;

    let calendar = document.getElementById('calendar');
    if (parseFloat(getComputedStyle(calendar).opacity) > 0.1) {
        calendar.style.cursor = "pointer";
    } else {
        calendar.style.cursor = "default";
}
}

// Listen for mouse wheel event
window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        adjustOpacity("down");
    } else {
        adjustOpacity("up");
    }
    event.preventDefault();  // Prevent actual scrolling (optional)
}, { passive: false });

// Listen for touchmove event
let startTouchY;
window.addEventListener('touchstart', function(event) {
    startTouchY = event.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', function(event) {
    let touchY = event.touches[0].clientY;

    if (touchY > startTouchY) {
        adjustOpacity("up");
    } else {
        adjustOpacity("down");
    }
    event.preventDefault();  // Prevent actual scrolling (optional)
}, { passive: false });
