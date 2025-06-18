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

        $('#projectList').html(filtered.map(p =>
            `<div class="project">
                <h3>${p.name}</h3>
                <div><strong>Type:</strong> ${(p.typeTags || []).join(', ')}</div>
                <div><strong>Skills:</strong> ${(p.skillTags || []).join(', ')}</div>
            </div>`
        ).join(''));
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