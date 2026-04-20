(function () {
  window.RESUME_ZH_INNER_HTML = `
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
          <div class="resume-hero-name">殷明</div>
          <div class="resume-hero-chips">
            <span class="contact-pill"><strong>邮箱 1: </strong><a href="mailto:arthur.yin@mail.ustc.edu.cn">arthur.yin@mail.ustc.edu.cn</a></span>
            <span class="contact-pill"><strong>邮箱 2: </strong><a href="mailto:mingyin025@gmail.com">mingyin025@gmail.com</a></span>
          </div>
          <p class="resume-hero-intro">
          我是中国科学技术大学数学科学学院计算数学专业本科生，大一就读于生命科学学院，目前专注于深度学习驱动的计算流体力学研究.
          <br><br>
          作为一名计算数学专业的本科生，我对数学的热爱和对未知的好奇心一直是我学术道路上的双引擎。数学不仅教会了我严谨的逻辑思维，更培养了我在面对复杂问题时，能够抽丝剥茧、层层递进地找到核心本质的能力。
          <br><br>
          数学教给我的最重要的事，是做问题的"追根者"，而非答案的"搬运工"。我习惯先把复杂的问题层层剥开，直抵它最核心的数学本质，再像搭建公理体系一样，从最基础的模块开始，亲手构建出整个解决方案。这种思维方式让我不会盲目套用现成的工具与模型，而是能根据问题本身的特性，量身定制最适合的解法。我享受这种从无到有的构建过程，也珍视那些在深夜里突然闪现的灵感火花——它们是逻辑之外最美的馈赠，常常能让我在山重水复时看到柳暗花明。
          <br><br>
          我始终认为，好的研究应该像一首优美的数学定理：简洁、深刻、且具有普适性。我渴望在不同学科的交叉地带，找到那些能够连接不同领域的通用结构，用数学的力量，去解释和解决真实世界的问题。目前我正在深度学习方向进行探索，希望能将数学的严谨性与AI的强大能力结合起来。
          </p>
        </div>
      </div>
      
      <div class="section">
        <h2>研究兴趣</h2>
        <ul><li>深度学习、大语言模型（LLM）、计算流体力学、科学计算、数值分析、数学建模.</li></ul>
      </div>

      <div class="section">
        <h2>教育背景</h2>
        <div class="subheading">
          <span class="subheading-title">中国科学技术大学</span>
          <span>2023年9月 -- 2027年7月 (预计)</span>
        </div>

        <div class="subsubheading" style="display: flex; justify-content: space-between;">
          <span>
            计算数学专业本科在读（数学科学学院）
            <button class="expander" type="button" data-expand-target="exp-edu-bg-zh" data-expand-key="edu-bg" aria-expanded="false" aria-label="展开详情">
              <i class="fas fa-chevron-right"></i>
            </button>
            <br>
            （大一阶段就读于生命科学学院；AI+X 微专业，华东五校联盟）
          </span>
          <span>中国·合肥</span>
        </div>

        <div class="expand-row" id="exp-edu-bg-zh" aria-hidden="true" style="display:none;">
          <div class="expand-content">
            <div class="expand-item">
              <img src="./assets/images/Education_Background.png" alt="教育背景" style="max-width: 100%; max-height: 400px; height: auto; aspect-ratio: 3 / 4; object-fit: cover;">
            </div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>荣誉与奖项</h2>
        <table width="100%">
          <tr>
            <td>优秀学生奖学金 (铜奖)</td>
            <td align="right">2025</td>
          </tr>

          <tr>
            <td>奋进奖学金</td>
            <td align="right">2024</td>
          </tr>

          <tr>
            <td>优秀学生奖学金 (铜奖)</td>
            <td align="right">2024</td>
          </tr>

        </table>
      </div>
      
      <div class="section">
        <h2>科研经历</h2>
        <div class="subheading">
          <span class="subheading-title">基于深度学习的海上风机尾流建模</span>
          <span>2025年9月 -- 至今</span>
        </div>
        <div class="subsubheading">
          <div>导师: </div>
          <div style="margin-left: 20px;">
            <div><strong>陈景润教授</strong>(中国科学技术大学苏州高等研究院)</div>
            <div><strong>张寒特任副研究员</strong>(中国科学技术大学苏州高等研究院)</div>
            <div>计算与人工智能实验室(SCAI Lab)</div>
          </div>
        </div>
        <ul>
          <li>参与风机尾流智能预测课题，负责基准流场数据集的构建工作，基于数值分析理论完成了计算域设计、网格划分方案与边界条件设置的数学验证</li>
          <li>完成风机流体域与致动盘的几何建模，基于OpenFOAM平台搭建LES大涡模拟的数值计算框架</li>
          <li>目前正在基于OpenFOAM进行大规模并行计算，生成覆盖不同来流风速、湍流强度与偏航角的高精度尾流数据集，为后续深度学习模型训练做准备</li>
          <li>已完成PINNs、FNO等主流物理信息深度学习模型的文献调研与理论推导，正在开展模型的预研与初步验证工作</li>
        </ul>
        
      </div>
      
      <div class="section">
        <h2>教学经历</h2>
        <div class="subheading">
          <span class="subheading-title">助教, "线性代数B1"</span>
          <span>2026年2月 -- 2026年7月</span>
        </div>
        <div class="subsubheading">授课教师: <strong>乐珏教授</strong></div>
        <ul>
          <li>
            整理并编写详细习题解答与参考答案；维护开源仓库供同学使用:
            <a
              class="expand-action-btn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            > 
              <svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.8 1.19 1.83 1.19 3.09 0 4.45-2.7 5.42-5.27 5.7.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
              <span>仓库</span>
            </a>
          </li>
        </ul>

      </div>

      <div class="section">
        <h2>课程设计</h2>

        <div class="subheading">
          <span class="subheading-title">数学建模</span>
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
              <span>代码仓库</span>
            </a>
          </li>
        </ul>

        <div class="subheading">
          <span class="subheading-title">计算机图形学</span>
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
              <span>代码仓库</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div class="section">
        <h2>其他信息</h2>
        <ul>
          <li>
            <strong>技术能力: </strong>
            <ul>
              <li>编程: Python, C++, C, Mathematica</li>
              <li>工具: LaTeX, Ansys SpaceClaim</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    
    <a href="#" class="back-btn" id="resume-back-btn">
      <i class="fas fa-arrow-left"></i>
    </a>
  `;
})();
