(function () {
  const mount = document.getElementById("mount-meditations") || document.body;
  mount.insertAdjacentHTML("beforeend", `
  <div id="meditations">
    <div class="container">
      <div class="resume-heading">Blog</div>

      <div class="medit-contents">

        <div class="medit-entry">
          <div class="medit-row medit-row-big">
            <button class="expander" type="button" data-expand-target="exp-blog-fno" data-expand-key="blog-fno" aria-expanded="true" aria-label="Expand">
              <i class="fas fa-chevron-right"></i>
            </button>
            <span class="medit-title">From Fourier Series to Fourier Neural Operators: Bridging Classical Analysis and Modern Deep Learning</span>
          </div>
          <div class="expand-row is-open" id="exp-blog-fno" aria-hidden="false">
            <div class="medit-body">
              <p class="medit-meta">May 2026 · Mathematics · Scientific Computing</p>

              <p>In 1807, Jean-Baptiste Joseph Fourier made a claim so bold that Lagrange and Laplace stood to object: <em>any</em> periodic function could be expressed as an infinite sum of sines and cosines. The claim was not entirely correct in its original form, but the central insight &mdash; that complex signals can be decomposed into simple harmonic components &mdash; turned out to be one of the most fruitful ideas in the history of mathematics. Two centuries later, this same insight sits at the heart of one of the most exciting developments in scientific machine learning: the Fourier Neural Operator.</p>

              <h3>1. Fourier Series: The Art of Decomposition</h3>
              <p>Given a <em>T</em>-periodic function <em>f</em>(<em>x</em>), the Fourier series represents it as:</p>
              <p class="medit-math">f(x) = a₀/2 + ∑ₙ aₙ cos(2π n x / T) + bₙ sin(2π n x / T)</p>
              <p>where the coefficients are computed by projecting <em>f</em> onto the orthogonal basis of sines and cosines:</p>
              <p class="medit-math">aₙ = (2/T) ∫₀ᵀ f(x) cos(2π n x / T) dx, &emsp; bₙ = (2/T) ∫₀ᵀ f(x) sin(2π n x / T) dx</p>
              <p>What makes this decomposition so powerful is that each Fourier coefficient tells us exactly how much of frequency <em>n</em> is present in the original signal. A square wave, for example, contains only odd harmonics with amplitudes decaying as 1/<em>n</em> &mdash; a fact that explains the characteristic &ldquo;ringing&rdquo; at sharp edges (the Gibbs phenomenon). Understanding this decomposition is the first step toward understanding why Fourier methods work so well for PDEs: many differential operators become simple algebraic multipliers in the frequency domain.</p>

              <h3>2. The Fourier Transform: From Discrete to Continuous</h3>
              <p>When we let the period <em>T</em> → ∞, the discrete sum of Fourier series naturally transitions to an integral, giving us the Fourier transform pair:</p>
              <p class="medit-math">ξ(ξ) = ∫ f(x) e⁻²πᵢώx dx, &emsp; f(x) = ∫ ξ(ξ) e²πᵢώx dξ</p>
              <p>The Fourier transform maps convolution to pointwise multiplication. This property, known as the Convolution Theorem, is the mathematical engine behind spectral methods for PDEs. Consider the Navier-Stokes equations &mdash; the nonlinear convective term becomes a convolution in Fourier space, transforming a challenging nonlinear PDE into a more tractable algebraic operation. This is precisely why spectral methods achieve exponential convergence for smooth solutions of fluid dynamics problems.</p>

              <h3>3. Spectral Methods for PDEs</h3>
              <p>In a spectral method, we approximate the solution <em>u</em>(<em>x</em>,<em>t</em>) of a PDE by truncating its Fourier series to <em>N</em> modes and evolving the coefficients in time. For a linear PDE like the heat equation ∂ₜ u = α ∂ₓₓ u, applying the Fourier transform yields:</p>
              <p class="medit-math">∂ₜ û(ξ, t) = -α (2πξ)² û(ξ, t)</p>
              <p>This is now an ODE for each mode ξ, with the exact solution û(ξ, t) = û(ξ, 0) e⁻α⁽²πξ⁾²ᵗ. The exponential decay of high frequencies matches our physical intuition: heat diffuses, smoothing out sharp gradients. More importantly, the error in a spectral method decreases faster than any polynomial in 1/<em>N</em> for smooth solutions &mdash; a property called <em>spectral accuracy</em>. This is in stark contrast to finite difference methods, where the error only decreases as <em>O</em>(<em>h</em>ᵖ) for some fixed <em>p</em>.</p>

              <h3>4. The Neural Operator: Learning Mappings Between Function Spaces</h3>
              <p>Traditional neural networks map between finite-dimensional vector spaces. But many problems in physics and engineering require learning mappings between <em>function spaces</em>: given an input function (e.g., initial condition, boundary data, or material property field), predict the output function (e.g., the solution at a later time). This is the central idea behind neural operators, formalized by Kovachki et al. (2021).</p>
              <p>A neural operator learns a mapping between infinite-dimensional function spaces through an iterative update:</p>
              <p class="medit-math">vₜ₊₁(x) = σ( W vₜ(x) + ∫ κ(x, y) vₜ(y) dy )</p>
              <p>where κ is a kernel function parameterizing the integral operator. The challenge is that computing this integral at each layer is computationally prohibitive &mdash; precisely the bottleneck that Fourier Neural Operators elegantly resolve.</p>

              <h3>5. Fourier Neural Operators: Where Spectral Meets Deep Learning</h3>
              <p>The key insight of the Fourier Neural Operator (FNO), proposed by Li et al. (2020), is to <em>replace the kernel integral in Fourier space with a pointwise multiplication</em>. By the Convolution Theorem, if we assume the kernel depends only on the distance |<em>x</em>-<em>y</em>| (i.e., it is a convolution), the integral operator becomes:</p>
              <p class="medit-math">∫ κ(x-y) vₜ(y) dy = ℱ⁻¹( R · ℱ(vₜ) )</p>
              <p>Here ℱ is the Fourier transform, <em>R</em> is a learned matrix of complex weights applied directly in the frequency domain, and ℱ⁻¹ is the inverse transform. In practice, the FFT is used, truncating to a finite number of modes, and the parameters <em>R</em> are learned through backpropagation. The architecture of each FNO layer is remarkably clean:</p>
              <p class="medit-math">vₜ₊₁(x) = σ( W vₜ(x) + ℱ⁻¹( Rₜ · ℱ(vₜ) )(x) )</p>
              <p>The linear transformation <em>W</em> handles local interactions in physical space, while the Fourier block captures global, non-local dependencies by learning directly in the frequency domain. This is the same frequency-domain thinking that Fourier pioneered &mdash; applied through the lens of modern deep learning.</p>

              <h3>6. Why Fourier Methods Work So Well for PDEs</h3>
              <p>There is a deep mathematical reason why Fourier bases are particularly well-suited for learning solution operators of PDEs. Many PDEs exhibit <em>low-frequency dominance</em>: the energy of the solution is concentrated in the low-frequency modes, with high-frequency components decaying rapidly (this is precisely why spectral methods converge so quickly). By truncating to <em>k</em> Fourier modes, FNO achieves a natural form of regularization &mdash; it implicitly assumes that the solution operator is bandlimited, which is often true for the types of PDEs encountered in fluid dynamics, climate modeling, and material science. Moreover, the FNO is <em>discretization-invariant</em>: once trained on one resolution, it can be evaluated on any other resolution without retraining, because the learned weights operate on specific frequency modes independent of the spatial grid.</p>

              <h3>7. From Theory to Practice: CFD and Beyond</h3>
              <p>In computational fluid dynamics, high-fidelity simulations using large-eddy simulation (LES) or direct numerical simulation (DNS) can require millions of CPU-hours for a single configuration. The promise of FNO-based surrogate models is to reduce this cost by orders of magnitude: train on a dataset of high-fidelity simulations, then predict flow fields in milliseconds for new input conditions. This is precisely the direction of my current research on deep-learning-based wind turbine wake modeling, where we are generating LES datasets on OpenFOAM to train surrogate models capable of real-time wake prediction across varying inflow conditions and yaw angles. The FNO&rsquo;s ability to handle the multiscale nature of turbulent flows &mdash; capturing both large-scale wake meandering and small-scale turbulent mixing through different Fourier modes &mdash; makes it a natural fit for this problem.</p>

              <h3>8. Closing Thoughts</h3>
              <p>What I find most beautiful about this line of development is the continuity of mathematical ideas. Fourier could not have imagined GPUs or backpropagation, but his core insight &mdash; that the frequency domain offers a privileged perspective for understanding and manipulating functions &mdash; flows uninterrupted from the heat equation of 1807 to the neural operators of 2024. The mathematics of the 19th century is not obsolete; it is the foundation on which 21st-century AI for science is being built. As I continue my studies in computational mathematics, I am increasingly convinced that the deepest advances in scientific machine learning will come not from bigger models or more data, but from deeper integration with the mathematical structures &mdash; symmetries, conservation laws, spectral decompositions &mdash; that have governed physical systems all along.</p>

              <p class="medit-signature">&mdash; Ming Yin, May 2026</p>
            </div>
          </div>
        </div>

        <div class="medit-entry">
          <div class="medit-row medit-row-big">
            <button class="expander" type="button" data-expand-target="exp-blog-poem" data-expand-key="blog-poem" aria-expanded="false" aria-label="Expand">
              <i class="fas fa-chevron-right"></i>
            </button>
            <span class="medit-title">Summer Love</span>
          </div>
          <div class="expand-row" id="exp-blog-poem" aria-hidden="true" style="display:none;">
            <div class="medit-body">
              <div class="medit-poem">
                <div class="stanza">
                  <p>The scorching wind blows through the midsummer</p>
                  <p>Bright sunlight filters through the dappled tree shadows</p>
                  <p>I reach out to catch the noisy cicada songs</p>
                  <p>Standing beneath the shade, waiting for my beloved to come</p>
                </div>
                <div class="stanza">
                  <p>The melting ice cream drips drip drip drip</p>
                  <p>We share the plum soup in the white porcelain bowl</p>
                  <p>The split chilled watermelon holds boundless love</p>
                  <p>And the girl's eyes reflected in its red flesh</p>
                </div>
                <div class="stanza">
                  <p>Footsteps echo through the town on the orange-scented breeze</p>
                  <p>Frogs in the pond tell of our sweetness</p>
                  <p>Lotus flowers in the park witness our vows</p>
                  <p>I long to hold your hand and turn into birds to travel the world</p>
                </div>
                <div class="stanza">
                  <p>To see the sky embrace the sea</p>
                  <p>To hear seagulls murmur in the wind</p>
                  <p>And to walk side by side on the Milky Way</p>
                  <p>Hiding our forms</p>
                  <p>Eavesdropping on the whispers of the Cowherd and Weaver Girl</p>
                </div>
                <div class="stanza">
                  <p>Or lost in the sweetness of day after day</p>
                  <p>The start of school comes unexpectedly</p>
                  <p>We have to scatter like dandelion seeds</p>
                  <p>One here, one there</p>
                </div>
                <div class="stanza">
                  <p>The distant distance</p>
                  <p>Can never defeat the love that spans the entire summer</p>
                </div>
                <div class="stanza">
                  <p>Looking back on the whole midsummer</p>
                  <p>It is full of your warm palm</p>
                  <p>And the endless cicada songs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  `);
})();
