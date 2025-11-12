async function main() {
  let buyButtons = document.getElementsByClassName("ransom")  // Read JSON
  for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener("click", () => {
      window.location.replace("/ransom");
    })
  }

  let data = await fetch("../data.json").then((res) => {
    return res.json();
  });

  // Simple cart counter behavior
  // const cartCountSpan = document.getElementById('cart-count');
  // let cartCount = 0;
  //
  // document.querySelectorAll('.add-to-cart').forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     cartCount += 1;
  //     cartCountSpan.textContent = cartCount;
  //   });
  // });

  // Get/display products
  let products = data["products"];
  products.map((prod) => {
    prod
  });

  // Get/display ad
  let idx = 0;
  let adImageLinks = data["ads"];
  setInterval(() => {
    document.getElementById("ad-img").src = adImageLinks[(idx) % adImageLinks.length];
    idx++;
  }, 300);

  document.getElementById("ad-wrapper").addEventListener("click", () => {
    window.location.href = "https://us.shein.com/";
  })

  setInterval(() => {
    function slowDownPageWithHeavyComputation(iterations) {
      let result = 0;
      for (let i = 0; i < iterations; i++) {
        // Perform a computationally intensive operation
        result += Math.sqrt(i) * Math.log(i + 1);
      }
      console.log("Heavy computation finished. Result:", result);
    }

    // Call the function with a large number of iterations to significantly slow down the page
    // Be cautious with very large numbers as it can make the page unresponsive.
    slowDownPageWithHeavyComputation(100000000); 
  }, 2000);
}

main();
