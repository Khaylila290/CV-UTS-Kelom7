document.addEventListener("DOMContentLoaded", function () {

    // 1. SEARCH PROFILE
    const searchInput = document.getElementById("searchInput");
    const profileCards = document.querySelectorAll(".profile-card");
    const noResults = document.getElementById("noResults");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = searchInput.value
                .toLowerCase()
                .trim();

            let visibleCount = 0;

            profileCards.forEach(function (card) {
                const searchableText = card.textContent.toLowerCase();
                const extraKeywords = (
                    card.getAttribute("data-search") || ""
                ).toLowerCase();

                const isMatch =
                    searchableText.includes(keyword) ||
                    extraKeywords.includes(keyword);

                card.hidden = !isMatch;

                if (isMatch) {
                    visibleCount++;
                }
            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }
        });
    }

    // 2. DARK MODE
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const isDarkMode =
                document.body.classList.contains("dark-mode");

            themeToggle.textContent = isDarkMode
                ? "☀ Tema"
                : "☾ Tema";
        });
    }

    // 3. SMOOTH SCROLL FOR INTERNAL LINKS
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }
        });
    });

});
