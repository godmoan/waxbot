  repairValue = document.getElementById('repairValue'),
  repairRange = document.getElementById('repairRange'),
  
  setValue = ()=>{
    const
      newValue = Number( (repairRange.value - repairRange.min) * 100 / (repairRange.max - repairRange.min) ),
      newPosition = 10 - (newValue * 0.2);
      repairValue.innerHTML = `<span>${repairRange.value}</span>`;
      repairValue.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
repairRange.addEventListener('input', setValue);


refillValue = document.getElementById('refillValue'),
refillRange = document.getElementById('refillRange'),

setValue = ()=>{
  const
    newValue = Number( (refillRange.value - refillRange.min) * 100 / (refillRange.max - refillRange.min) ),
    newPosition = 10 - (newValue * 0.2);
    refillValue.innerHTML = `<span>${refillRange.value}</span>`;
    refillValue.style.left = `calc(${newValue}% + (${newPosition}px))`;
};
document.addEventListener("DOMContentLoaded", setValue);
refillRange.addEventListener('input', setValue);