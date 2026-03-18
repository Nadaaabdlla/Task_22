// main variables
const jobContainers = document.querySelectorAll(".job-container");
const videos = document.querySelectorAll("video");

// Add click event listeners to each job container to toggle the visibility of the video and description
videos.forEach((video) => {
  const h3 = video.nextElementSibling;
  const p = h3.nextElementSibling;
  const ul = p.nextElementSibling;
  const jobContainer = video.parentElement;

  // Add click event listener to the job container
  jobContainer.addEventListener("click", () => {
    h3.classList.toggle("hidden");
    p.classList.toggle("hidden");
    ul.classList.toggle("hidden");
    video.classList.toggle("hidden");
    video.classList.toggle("visible");

    // If the video is now visible, play it and expand the container; otherwise, reset the container and pause the video
    if (video.classList.contains("visible")) {
      video.currentTime = 0;
      video.play();
      jobContainer.style.padding = "0%";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "fill";
    } else {
      jobContainer.style.width = "400px";
      jobContainer.style.height = "170px";
      jobContainer.style.padding = "1%";
      video.pause();
    }

    // Hide all other videos and show their descriptions
    jobContainers.forEach((container) => {
      if (container != jobContainer) {
        container.querySelector("video").classList.add("hidden");
        container.querySelector("video").classList.remove("visible");
        container.querySelector("video").pause();
        container.querySelector("h3").classList.remove("hidden");
        container.querySelector(".job-description").classList.remove("hidden");
        container.querySelector("ul").classList.remove("hidden");
        container.style.width = "400px";
        container.style.height = "170px";
        container.style.padding = "1%";
      }
    });

    // Check every 3 seconds if the video has ended, and if so, reset the container
    setInterval(() => {
      if (video.classList.contains("visible") && video.currentTime >= video.duration) {
        h3.classList.remove("hidden");
        p.classList.remove("hidden");
        ul.classList.remove("hidden");
        video.classList.add("hidden");
        video.classList.remove("visible");
        jobContainer.style.width = "400px";
        jobContainer.style.height = "170px";
        jobContainer.style.padding = "1%";
      }
    }, 3000);
  });
});

// Skills section animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bars = document.querySelectorAll(".progress-bar");
      bars.forEach((bar) => {
        const value = bar.getAttribute("data-progress");
        bar.style.width = value + "%";
        const barCon = bar.parentElement;
        if (barCon.parentElement.querySelector("span") == null) {
          const percentage = document.createElement("span");
          percentage.textContent = value + "%";
          percentage.style.verticalAlign = "top";
          percentage.style.color = "#115097";
          barCon.parentElement.prepend(percentage);
        }
      });
    }
  });
});
observer.observe(document.querySelector("#skills"));

