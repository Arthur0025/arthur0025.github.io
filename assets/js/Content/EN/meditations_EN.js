(function () {
  const mount = document.getElementById("mount-meditations") || document.body;

  mount.insertAdjacentHTML("beforeend", `
  <div id="meditations">
    <div class="container">
      <div class="resume-heading">Meditations</div>

      <div class="section">
        <div class="medit-contents">
        </div>
      </div>
    </div>
  </div>
  `);
})();
