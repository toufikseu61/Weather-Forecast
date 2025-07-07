const apiKey = 'a97867fc7acad7844e2faf124eb8df7a'; // Replace with your OpenWeatherMap API key

        const weatherForm = document.getElementById('weatherForm');
        const cityInput = document.getElementById('cityInput');
        const weatherInfo = document.getElementById('weatherInfo');
        const weatherIcon = document.getElementById('weatherIcon');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const humidity = document.getElementById('humidity');
        const wind = document.getElementById('wind');
        const errorMsg = document.getElementById('errorMsg');

        weatherForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const city = cityInput.value.trim();
            if (!city) return;
            errorMsg.textContent = '';
            weatherInfo.style.display = 'none';
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
                );
                if (!res.ok) throw new Error('City not found');
                const data = await res.json();
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                weatherIcon.alt = data.weather[0].description;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
                description.textContent = data.weather[0].description;
                humidity.textContent = data.main.humidity;
                wind.textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h
                weatherInfo.style.display = 'block';
            } catch (err) {
                errorMsg.textContent = err.message;
            }
        });