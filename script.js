const mainSection = document.getElementById("main-section");
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	mainSection.innerHTML = "";
	const text = document.querySelector("#searchbar").value;
	const url = `https://api.giphy.com/v1/gifs/search?q=${text}&api_key=vdCXDzE9esrSrhr7HYoeg7lO4U2JPJj5&limit=40`;

	fetch(url)
		.then((res) => res.json())
		.then((gifs) => {
			gifs.data.forEach(({ images, title }, idx) => {
				mainSection.innerHTML += `<div class="gif-card" onmouseover="handleDownload(event, '${images.original.url}', ${idx})" onmouseout="handleUrl(event, '${images.downsized_still.url}')">
                                    <progress id="${idx}" class="progress" value="0" max="1"></progress>
                                        <img
                                            src=${images["downsized_still"].url}
                                            alt="..."
                                        />
                                        <h3 class="title">${title}</h3>
                                    </div>`;
			});
		})
		.catch((err) => alert(err));
});

const url =
	"https://api.giphy.com/v1/gifs/trending?api_key=vdCXDzE9esrSrhr7HYoeg7lO4U2JPJj5&limit=40";

fetch(url)
	.then((res) => res.json())
	.then((gifs) => {
		gifs.data.forEach(({ images, title }, idx) => {
			mainSection.innerHTML += `<div class="gif-card" onmouseover="handleDownload(event, '${images.original.url}', ${idx})" onmouseout="handleUrl(event, '${images.downsized_still.url}')">
                                        <progress id="${idx}" class="progress" value="0" max="1"></progress>
                                            <img
                                                src=${images["downsized_still"].url}
                                                alt="..."
                                            />
                                            <h3 class="title">${title}</h3>
                                        </div>`;
		});
	})
	.catch((err) => alert(err));

function handleDownload(elem, url, progressIdx) {
	const progressBars = document.querySelectorAll(".progress");
	progressBars[progressIdx].style.display = "block";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.overrideMimeType("text/plain; charset=x-user-defined");
	xhr.send(null);
	xhr.onprogress = (e) => {
		if (!e.lengthComputable) {
			return;
		}
		const loaded = e.loaded;
		const total = e.total;
		const progress = (loaded / total).toFixed(2);
		progressBars[progressIdx].value = progress;
	};
	xhr.onload = () => {
		elem.target.src = url;
		progressBars[progressIdx].style.display = "none";
	};
	xhr.onerror = onError;
}

function onError(e) {
	console.error(e);
}

function handleUrl(e, url) {
	e.target.src = url;
}
