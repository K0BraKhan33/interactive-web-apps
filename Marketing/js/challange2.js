// Retrieve HTML elements
const bDateDayElement = document.getElementById('bDateDay');
const bDateMonthElement = document.getElementById('bDateMonth');
const bDateYearElement = document.getElementById('bDateYear');
const acceptButton = document.getElementById('accept');
const oDateElement = document.getElementById('ODate');
const tDateElement = document.getElementById('tDate');
const tDiffElement = document.getElementById('tDiff');
const tPaymentElement = document.getElementById('tPayment');

// Add event listener to the button
acceptButton.addEventListener('click', fAccept);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `[${year}/${month}/${day}]`;
}

function fAccept() {
  // Get the date values from HTML elements
  const bDateDay = parseInt(bDateDayElement.value);
  const bDateMonth = parseInt(bDateMonthElement.value);
  const bDateYear = parseInt(bDateYearElement.value);
  const bDate = new Date(bDateYear, bDateMonth - 1, bDateDay);
  const tDate = new Date();

  // Format the dates
  const formattedBDate = formatDate(bDate);
  const formattedTDate = formatDate(tDate);

  // Update the HTML elements with the formatted dates
  oDateElement.textContent = formattedBDate;
  tDateElement.textContent = formattedTDate;

  // Calculate the time difference in seconds
  const timeDiff = Math.floor((tDate.getTime() - bDate.getTime()) / 1000);

  // Calculate the number of days
  const diffDays = Math.ceil(timeDiff / (24 * 3600));

  // Display the difference in days
  tDiffElement.textContent = diffDays;

  // Calculate the total payment based on the specified conditions
  let tPayment = 0;
  let c = 0;
  let c2 = 0;

  for (let i = 1; i <= diffDays; i++) {
    c++;
    c2++;
    if (c2 !== 3 && c !== 6) {
        tPayment += 40;
        console.log(00000000000000)
        
      }

      if (c2 === 3 && c !== 6) {
        tPayment += 20;
        c2=0;
        console.log(44444444444)
      }
    if (c === 6) {
      tPayment += 50;
      c=0;
      console.log(77777777777)
    }
   
   
    console.log(tPayment)
  }


  // Display the total payment
  tPaymentElement.textContent = tPayment;
}
