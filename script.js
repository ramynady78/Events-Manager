
function setMainDate (){
    const today = new Date().toISOString().split("T")[0];
    const timeNow = new Date().toISOString().split("T")[1].split(".")[0];
    

    const eventDate = document.querySelector(".event-date");
    const eventTime = document.querySelector(".event-time");
    
    eventDate.setAttribute("min" ,today);
    eventTime.setAttribute("min" ,timeNow);
    eventDate.addEventListener("input" , () =>{
        if (eventDate.value < today){
            eventDate.value = today
        }
    })
    eventTime.addEventListener("input" , () =>{
        if (eventDate.value === today && eventTime.value < timeNow){
            eventTime.value = timeNow ;
        }
        
    })
    
}
setMainDate ();

function addEvent () {
    const eventName = document.querySelector(".event-name").value;
    const eventDate = document.querySelector(".event-date").value;
    const eventorganizar = document.querySelector(".organizar").value;
    const eventTime= document.querySelector(".event-time").value;
    // git Time for Milliseconds from epoch to eventdate 
    const eventTimeStamp = new Date(eventDate).getTime();
    
    
    if ( eventName && eventorganizar && eventDate  && eventTime){

        if (eventName.length >= 3){
            if (eventorganizar.length >= 4){
                const event = {
                    name: eventName,
                    date: eventDate,
                    organizar: eventorganizar,
                    time : eventTime,
                    timeStamp: eventTimeStamp,
                };


                const events = JSON.parse(localStorage.getItem("events")) || [];
                events.push(event);
                localStorage.setItem("events" , JSON.stringify(events));

                const inputs = document.querySelectorAll("input");
                inputs.forEach((input) => (input.value = "")) ;

                displayevent();
            

            }else{
                    alert("Event Organizarfield should be at minimum four letters")
            }

        }else{
            alert("Event Name field should be at minimum three letters")
        };
        


    }else{
        alert("please vaild all information");
    };
    
    

}

function displayevent(){

    

    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventList = document.querySelector(".events");
    eventList.innerHTML = "";
    events.forEach((event ,index) => {
        const now = new Date ().getTime();
        const leftTime = event.timeStamp - now; 
        const days = Math.floor(leftTime / (1000 * 60 * 60 *24));
        const hours = Math.floor(leftTime % (1000 * 60 * 60 *24) / (1000 * 60 * 60));
        const minutes = Math.floor(leftTime % (1000 * 60 * 60 ) / (1000 * 60));
        const seconds = Math.floor(leftTime % (1000 * 60) / 1000 );

        const counDown = `${days}D ${hours}H ${minutes}M ${seconds}S`;


        eventList.innerHTML += `
        <div class="event"> 
            <h3> <span><img src="imges/mirror-ball.png" alt=""></span>${event.name}</h3>
            <p><span><img src="imges/schedule.png" alt=""></span> ${event.organizar}</p>
            <p><span><img src="imges/calendar.png" alt=""></span> ${event.date}</p>
            <p><span><img src="imges/event (1).png" alt=""></span> ${event.time}</p>
            <p><span><img src="imges/live.png" alt=""></span> ${counDown}</p> 
            <button onclick="deleteEvent(${index})" class="delete-event">Delete</button>


        </div>
        `
    });
};

displayevent();
function deleteEvent(index){
    const events = JSON.parse(localStorage.getItem("events"));
    events.splice(index ,1)
    localStorage.setItem("events" , JSON.stringify(events));
    displayevent();


};



setInterval(displayevent ,1000);


