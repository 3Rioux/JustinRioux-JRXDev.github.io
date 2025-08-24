// Example: Place your project data in a JSON file, e.g., 'projects.json' in the same folder.
// [
//   {
//     "name": "Portfolio Website",
//     "typeTags": ["Web", "Personal"],
//     "skillTags": ["HTML", "CSS", "JavaScript"]
//   },
//   ...
// ]

$(document).ready(function () {
    let projects = [];
    let selectedTypeTags = [];
    let selectedSkillTags = [];

    // Load projects from JSON file
    $.getJSON('data/projects.json', function (data) {
        projects = data;
       // renderTags();
        renderProjects();
    });

    // Render tags
    // function renderTags() {
    //     const typeTagsSet = new Set();
    //     const skillTagsSet = new Set();
    //     projects.forEach(p => {
    //         (p.typeTags || []).forEach(tag => typeTagsSet.add(tag));
    //         (p.skillTags || []).forEach(tag => skillTagsSet.add(tag));
    //     });

    //     // Project Type Tags
    //     $('#projectTypeTags').html([...typeTagsSet].map(tag =>
    //         `<span class="tag type-tag" data-tag="${tag}">${tag}</span>`
    //     ).join(' '));

    //     // Skill Tags
    //     $('#skillTags').html([...skillTagsSet].map(tag =>
    //         `<span class="tag skill-tag" data-tag="${tag}">${tag}</span>`
    //     ).join(' '));
    // }

    function getProjectMediaHtml(mediaArr, projectIndex) {
        if (!Array.isArray(mediaArr) || mediaArr.length === 0) return '';
        let mediaHtml = '';
        mediaArr.forEach((item, i) => {
            if (item.type === 'image') {
                //mediaHtml += `<img src="${item.src}" class="carousel-media" data-index="${i}" style="display:${i === 0 ? 'block' : 'none'};max-width:100%;border-radius:0.5em;" alt="Project media ${i + 1}">`;
                mediaHtml += `<img src="${item.src}" data-index="${i}" class="carousel-media project__multimedia_cropping--image" alt="Project media ${i + 1}"/>`
            } else if (item.type === 'video') {
                mediaHtml += `<video src="${item.src}" class="carousel-media" data-index="${i}" style="display:${i === 0 ? 'block' : 'none'};max-width:100%;border-radius:0.5em;" controls></video>`;
            }
        });
        return `
            <div class=" project_multimedia carousel" data-project="${projectIndex}">
                ${mediaHtml}
                <button class="carousel-prev" data-project="${projectIndex}">&#8592;</button>
                <button class="carousel-next" data-project="${projectIndex}">&#8594;</button>
            </div>
        `;
    }

    // Render projects
    function renderProjects() {
        const search = $('#searchInput').val().toLowerCase();
        const filtered = projects.filter(p => {
            // If search is empty, ignore search filter
            const matchesSearch = !search || p.name.toLowerCase().includes(search);
            //const matchesSearch = p.name.toLowerCase().includes(search);

            // const matchesType = selectedTypeTags.length === 0 || (p.typeTags || []).some(tag => selectedTypeTags.includes(tag));
            // const matchesSkill = selectedSkillTags.length === 0 || (p.skillTags || []).some(tag => selectedSkillTags.includes(tag));
            
             // If no tags selected, ignore tag filter
            const matchesType = selectedTypeTags.length === 0 || (p.typeTags || []).some(tag => selectedTypeTags.includes(tag));
            const matchesSkill = selectedSkillTags.length === 0 || (p.skillTags || []).some(tag => selectedSkillTags.includes(tag));

            // All filters are ANDed together
            return matchesSearch && matchesType && matchesSkill;
        });

        if (filtered.length === 0) {
            $('#projectList').html('<p>No projects found.</p>');
            return;
        }

        // $('#projectList').html(filtered.map((p, idx) => {
        //     const mediaHtml = p.media ? getProjectMediaHtml(p.media, idx) : '';
        //     return `
        //         <div class="project">
        //             <h3>${p.name}</h3>
        //             <div class="content_skill"><strong>Type:</strong> ${(p.typeTags || p.type || []).join(', ')}</div>
        //             <div><strong>Skills:</strong> ${(p.skillTags || p.skills || []).join(', ')}</div>
        //             ${mediaHtml}
        //         </div>
        //     `;
        // }).join(''));
        $('#projectList').html(filtered.map((p, idx) => {
            const mediaHtml = p.media ? getProjectMediaHtml(p.media, idx) : '';
            // Render Type tags
            const typeArr = p.typeTags || p.type || [];
            const typeHtml =
                typeArr.map(t => `<p class="content_skill">${t}</p>`).join('');
            // Render Skill tags
            const skillArr = p.skillTags || p.skills || [];
            const skillHtml = `<div class="skills_list">` +
                skillArr.map(s => `<p class="content_skill">${s}</p>`).join('') +
                `</div>`;
            return `
                <div class="project">
                    <h3>${p.name}</h3>
                    <div><strong>Type:</strong> ${typeHtml}</div>
                    <div><strong>Skills:</strong> ${skillHtml}</div>
                    ${mediaHtml}
                </div>
            `;
        }).join(''));

        // $('#projectList').html(filtered.map(p =>
        //     `<div class="project">
        //         <h3>${p.name}</h3>
        //         <div><strong>Type:</strong> ${(p.typeTags || []).join(', ')}</div>
        //         <div><strong>Skills:</strong> ${(p.skillTags || []).join(', ')}</div>
        //     </div>`
        // ).join(''));

        // Carousel logic
        $('#projectList').off('click', '.carousel-prev').on('click', '.carousel-prev', function () {
            const projectIdx = $(this).data('project');
            const $carousel = $(`.carousel[data-project="${projectIdx}"]`);
            const $media = $carousel.find('.carousel-media');
            let current = $media.index($media.filter(':visible'));
            $media.eq(current).hide();
            current = (current - 1 + $media.length) % $media.length;
            $media.eq(current).show();
        });
        $('#projectList').off('click', '.carousel-next').on('click', '.carousel-next', function () {
            const projectIdx = $(this).data('project');
            const $carousel = $(`.carousel[data-project="${projectIdx}"]`);
            const $media = $carousel.find('.carousel-media');
            let current = $media.index($media.filter(':visible'));
            $media.eq(current).hide();
            current = (current + 1) % $media.length;
            $media.eq(current).show();
        });
    }

    // Search input event
    $('#searchInput').on('input', renderProjects);

    // Tag click events
    $('#projectTypeTags').on('click', '.type-tag', function () {
        const tag = $(this).data('tag');
        $(this).toggleClass('selected');
        if ($(this).hasClass('selected')) {
            selectedTypeTags.push(tag);
        } else {
            selectedTypeTags = selectedTypeTags.filter(t => t !== tag);
        }
        renderProjects();
    });

    $('#skillTags').on('click', '.skill-tag', function () {
        const tag = $(this).data('tag');
        $(this).toggleClass('selected');
        if ($(this).hasClass('selected')) {
            selectedSkillTags.push(tag);
        } else {
            selectedSkillTags = selectedSkillTags.filter(t => t !== tag);
        }
        renderProjects();
    });
});