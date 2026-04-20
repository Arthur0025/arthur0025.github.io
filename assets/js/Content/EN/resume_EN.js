(function () {
  const mount = document.getElementById("mount-resume") || document.body;
  mount.insertAdjacentHTML("beforeend", `
  <div id="resume">
    <button id="toggle-btn">
      <span><i class="fas fa-sun"></i></span>
    </button>
    <div id="clock">GMT+8 00:00</div>
    <div class="container">

      <div class="section resume-hero" id="resume-hero">
        <div class="resume-hero-avatar">
          <img src="./assets/images/profile.jpg" alt="Profile photo" style="max-width: 150px; height: auto; aspect-ratio: 9 / 16; object-fit: cover;">
        </div>
        <div class="resume-hero-body">
          <div class="resume-hero-name">Ming Yin</div>
          <div class="resume-hero-chips">
            <span class="contact-pill"><strong>Email 1:</strong><a href="mailto:arthur.yin@mail.ustc.edu.cn">arthur.yin@mail.ustc.edu.cn</a></span>
            <span class="contact-pill"><strong>Email 2:</strong><a href="mailto:mingyin025@gmail.com">mingyin025@gmail.com</a></span>
          </div>
          <p class="resume-hero-intro">
          I am an undergraduate student in Computational Mathematics at the School of Mathematical Sciences, University of Science and Technology of China (USTC). I spent my freshman year in the School of Life Sciences, and I am currently focused on deep-learning-driven computational fluid dynamics research.
          <br><br>
          As an undergraduate in Computational Mathematics, my passion for mathematics and curiosity about the unknown have always been the dual engines driving my academic journey. Mathematics has not only taught me rigorous logical thinking, but has also cultivated my ability to unravel complex problems layer by layer, progressively penetrating to their mathematical essence.
          <br><br>
          The most important thing mathematics has taught me is to be a "root seeker" of problems, not a "carrier" of answers. I prefer to peel complex problems layer by layer until I reach their mathematical core, then build the full solution from first principles, just as one builds an axiomatic system from basic modules. This mindset keeps me from blindly applying off-the-shelf tools and models; instead, I design solutions that match the structure of the problem itself. I enjoy this process of building from zero to one, and I value those sudden flashes of insight that appear late at night; they are the most beautiful gifts beyond pure logic, and they often open a new path when progress seems blocked.
          <br><br>
          I believe good research should be like an elegant mathematical theorem: concise, profound, and broadly applicable. I hope to find general structures in interdisciplinary spaces that can connect different domains, and use mathematics to explain and solve real-world problems. I am currently exploring deep learning and aim to combine mathematical rigor with the power of AI.
          </p>
        </div>
      </div>
      
      <div class="section">
        <h2>Research Interests</h2>
        <ul><li>Deep Learning, Large Language Models (LLMs), Computational Fluid Dynamics (CFD), Scientific Computing, Numerical Analysis, Mathematical Modeling.</li></ul>
      </div>

      <div class="section">
        <h2>Education</h2>
        <div class="subheading">
          <span class="subheading-title">University of Science and Technology of China</span>
          <span>Sep. 2023 -- Jul. 2027 (Expected)</span>
        </div>

        <div class="subsubheading" style="display: flex; justify-content: space-between;">
          <span>
            B.Sc. Candidate in Computational Mathematics (School of Mathematical Sciences)
            <button class="expander" type="button" data-expand-target="exp-edu-bg" data-expand-key="edu-bg" aria-expanded="false" aria-label="Expand details">
              <i class="fas fa-chevron-right"></i>
            </button>
            <br>
            (Freshman year in the School of Life Sciences; Additional Specialization in AI+X, East China Five Universities Consortium)
          </span>
          <span>Hefei, China</span>
        </div>

        <div class="expand-row" id="exp-edu-bg" aria-hidden="true" style="display:none;">
          <div class="expand-content">
            <div class="expand-item">
              <img src="./assets/images/Education_Background.png" alt="Education Background" style="max-width: 100%; max-height: 400px; height: auto; aspect-ratio: 3 / 4; object-fit: cover;">
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>Honors & Awards</h2>
        <table width="100%">
          <tr>
            <td>Excellent Student Scholarship--Bronze</td>
            <td align="right">2025</td>
          </tr>

          <tr>
            <td>Fengjin Scholarship</td>
            <td align="right">2024</td>
          </tr>

          <tr>
            <td>Excellent Student Scholarship--Bronze</td>
            <td align="right">2024</td>
          </tr>

        </table>
      </div>
      
      <div class="section">
        <h2>Research Experience</h2>
        <div class="subheading">
          <span class="subheading-title">Deep-Learning-Based Offshore Wind Turbine Wake Modeling</span>
          <span>Sep. 2025 -- Present</span>
        </div>
        <div class="subsubheading">
          <div>Advisors:</div>
          <div style="margin-left: 20px;">
            <div><strong>Prof. Jingrun Chen</strong> (Suzhou Institute for Advanced Research, University of Science and Technology of China)</div>
            <div><strong>Dr. Hante Zhang</strong> (Suzhou Institute for Advanced Research, University of Science and Technology of China)</div>
            <div>Computing and Artificial Intelligence Laboratory (SCAI Lab)</div>
          </div>
        </div>
        <ul>
          <li>Contributed to an intelligent wake-prediction project for wind turbines by building the benchmark flow-field dataset, and mathematically validating the computational domain, mesh generation strategy, and boundary-condition settings based on numerical analysis.</li>
          <li>Completed the geometric modeling of the turbine flow domain and actuator disk, and built a numerical simulation framework for large-eddy simulation (LES) on the OpenFOAM platform.</li>
          <li>Currently running large-scale parallel computations on OpenFOAM to generate high-fidelity wake datasets under varying inflow speeds, turbulence intensities, and yaw angles for subsequent deep-learning model training.</li>
          <li>Completed literature review and theoretical derivation of mainstream physics-informed deep learning models such as PINNs and FNO, and is now carrying out preliminary model design and validation.</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>Teaching Experience</h2>
        <div class="subheading">
          <span class="subheading-title">Teaching Assistant, "Linear Algebra B1"</span>
          <span>Feb. 2026 -- Jul. 2026</span>
        </div>
        <div class="subsubheading">Instructor: <strong>Prof. Yue Le</strong></div>
        <ul>
          <li>
            Organized and wrote detailed exercise solutions and reference answers; maintained an open-source repository for students:
            <a
              class="expand-action-btn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.8 1.19 1.83 1.19 3.09 0 4.45-2.7 5.42-5.27 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              <span>Repository</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="section">
        <h2>Selected Coursework Projects</h2>

        <div class="subheading">
          <span class="subheading-title">Mathematical Modeling</span>
        </div>

        <ul>
          <li>
            <a
              class="expand-action-btn"
              href="https://github.com/Arthur0025/USTC_MM_26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.8 1.19 1.83 1.19 3.09 0 4.45-2.7 5.42-5.27 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              <span>Repository</span>
            </a>
          </li>
        </ul>

        <div class="subheading">
          <span class="subheading-title">Computer Graphics</span>
        </div>

        <ul>
          <li>
            <a
              class="expand-action-btn"
              href="https://github.com/Arthur0025/USTC_CG_26_MyHomework"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.8 1.19 1.83 1.19 3.09 0 4.45-2.7 5.42-5.27 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              <span>Repository</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div class="section">
        <h2>Additional Information</h2>
        <ul>
          <li>
            <strong>Technical Skills:</strong>
            <ul>
              <li>Programming: Python, C++, C, Mathematica</li>
              <li>Tools: LaTeX, Ansys SpaceClaim</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    
    <a href="#" class="back-btn" id="resume-back-btn">
      <i class="fas fa-arrow-left"></i>
    </a>
  </div>
`);
})();
