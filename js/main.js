/**
 * Vismaya Pradeep - Portfolio JavaScript Engine
 * Senior Software QA Engineer & Test Automation Specialist
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  initThemeToggle();

  // 2. Mobile Navigation Toggle
  initMobileNav();

  // 3. Scroll Spy & Sticky Header
  initScrollSpy();

  // 4. Metric Counter Animation
  initMetricCounters();

  // 5. Interactive QA BDD Simulator
  initQASimulator();

  // 6. Framework Architecture Layer Inspector
  initArchitectureInspector();

  // 7. Project Category Filtering
  initProjectFilters();

  // 8. Copy to Clipboard Utility
  initClipboardButtons();

  // 9. Contact Form Simulation
  initContactForm();

  // 10. Resume Modal & Print Integration
  initResumeModal();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('vp_theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('vp_theme', 'dark');
        showToast('Switched to Dark Theme', 'info');
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('vp_theme', 'light');
        showToast('Switched to Light Theme', 'info');
      }
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   3. Scroll Spy & Sticky Header
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky header shadow effect
    if (header) {
      if (scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // Active Section Detection
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. Animated Metric Counters
   ========================================================================== */
function initMetricCounters() {
  const metricNumbers = document.querySelectorAll('.metric-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricNumbers.forEach(num => {
          const target = parseFloat(num.getAttribute('data-target'));
          const isDecimal = num.getAttribute('data-decimal') === 'true';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic formula
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOutProgress;

            if (isDecimal) {
              num.textContent = currentVal.toFixed(1);
            } else {
              num.textContent = Math.floor(currentVal);
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              num.textContent = isDecimal ? target.toFixed(1) : target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   5. Interactive QA BDD Simulator
   ========================================================================== */
const SCENARIOS = {
  'plm-change-order': {
    filename: 'OracleCloudPLM_ChangeOrder.feature',
    code: `Feature: Oracle Cloud PLM Engineering Change Order Validation
  As a Senior QA Engineer
  I want to automate the ECO lifecycle approval
  So that product revisions adhere to compliance standards

  @Smoke @Regression @CCG
  Scenario: Validate end-to-end ECO approval in Oracle Fusion
    Given User logs into Oracle Cloud PLM with "QA_Engineer" credentials
    And Navigates to Product Management > Change Orders workspace
    When User creates a new Change Order for Item "TF-BIO-9021"
    And Uploads the Engineering Bill of Materials (BOM) revision
    And Routes Change Order to "Thermo Fisher Quality Board"
    Then Verify status transitions to "PENDING_APPROVAL"
    And Validate dynamic audit log records the approval stamp
    And Assert no schema or constraint violations in backend response`,
    logs: [
      { text: '[INIT] Initializing Cucumber BDD Runtime...', type: 'info', delay: 100 },
      { text: '[CONFIG] Loaded environment: Oracle Fusion Cloud (Staging-04)', type: 'info', delay: 250 },
      { text: 'Given User logs into Oracle Cloud PLM with "QA_Engineer" credentials', type: 'step', delay: 400 },
      { text: '  --> Authentication HTTP 200 OK & Session Token generated', type: 'pass', delay: 650 },
      { text: 'And Navigates to Product Management > Change Orders workspace', type: 'step', delay: 850 },
      { text: '  --> Workspace DOM rendered in 410ms. Dynamic XPath resolved #tbl-change-orders', type: 'pass', delay: 1100 },
      { text: 'When User creates a new Change Order for Item "TF-BIO-9021"', type: 'step', delay: 1300 },
      { text: '  --> Form submission payload dispatched: ECO-9021-REV-C', type: 'highlight', delay: 1550 },
      { text: 'And Uploads the Engineering Bill of Materials (BOM) revision', type: 'step', delay: 1750 },
      { text: '  --> Attachment validated: MD5 verified, CSV validation passed', type: 'pass', delay: 1950 },
      { text: 'And Routes Change Order to "Thermo Fisher Quality Board"', type: 'step', delay: 2150 },
      { text: '  --> Multi-tier approval routing matrix triggered for 4 stakeholders', type: 'highlight', delay: 2400 },
      { text: 'Then Verify status transitions to "PENDING_APPROVAL"', type: 'step', delay: 2600 },
      { text: '  --> [ASSERTION SUCCESS] UI Status Label equals "PENDING_APPROVAL"', type: 'assert', delay: 2800 },
      { text: 'And Validate dynamic audit log records the approval stamp', type: 'step', delay: 3000 },
      { text: '  --> [ASSERTION SUCCESS] Audit record stamped with ISO-8601 timestamp', type: 'assert', delay: 3200 },
      { text: 'And Assert no schema or constraint violations in backend response', type: 'step', delay: 3400 },
      { text: '  --> [ASSERTION SUCCESS] Zero schema errors, 100% data integrity verified', type: 'assert', delay: 3600 },
      { text: '----------------------------------------------------------------------', type: 'dimmed', delay: 3750 },
      { text: '[SUMMARY] 1 Scenario Passed, 7 Steps Passed, 0 Failures (Duration: 3.82s)', type: 'pass', delay: 3900 }
    ],
    assertions: 3,
    duration: '3.82s'
  },
  'clm-contract-gate': {
    filename: 'MalbecCLM_ContractApproval.feature',
    code: `Feature: Malbec CLM Contract Approval Gate Validation
  As a QA Engineer supporting Thermo Fisher Scientific
  I want to automate high-value contract sign-off workflows
  So that regulatory and financial compliance gates are enforced

  @Enterprise @CLM @ThermoFisher
  Scenario: High-value commercial agreement multi-tier approval
    Given An active CLM contract draft with value "$450,000"
    And Contract type is set to "Master Services Agreement (MSA)"
    When Legal and Procurement validation flags are triggered
    And System evaluates threshold approval matrix
    Then Route for C-level executive electronic signature
    And Verify audit trail matches CSV compliance guidelines
    And Confirm ERP webhook dispatches state to Oracle Fusion`,
    logs: [
      { text: '[INIT] Launching Malbec CLM Regression Runner...', type: 'info', delay: 100 },
      { text: 'Given An active CLM contract draft with value "$450,000"', type: 'step', delay: 350 },
      { text: '  --> Contract object instantiated: CID-2025-TF-44819', type: 'pass', delay: 600 },
      { text: 'And Contract type is set to "Master Services Agreement (MSA)"', type: 'step', delay: 850 },
      { text: 'When Legal and Procurement validation flags are triggered', type: 'step', delay: 1100 },
      { text: '  --> Dynamic XPath verified all 14 mandatory legal clauses', type: 'highlight', delay: 1350 },
      { text: 'And System evaluates threshold approval matrix', type: 'step', delay: 1600 },
      { text: '  --> Threshold logic: Value > $250k requires Tier-3 VP Sign-off', type: 'highlight', delay: 1850 },
      { text: 'Then Route for C-level executive electronic signature', type: 'step', delay: 2100 },
      { text: '  --> [ASSERTION SUCCESS] E-signature envelope dispatched to VP inbox', type: 'assert', delay: 2350 },
      { text: 'And Verify audit trail matches CSV compliance guidelines', type: 'step', delay: 2600 },
      { text: '  --> [ASSERTION SUCCESS] CMMI/CSV audit log immutable hash verified', type: 'assert', delay: 2850 },
      { text: 'And Confirm ERP webhook dispatches state to Oracle Fusion', type: 'step', delay: 3050 },
      { text: '  --> [ASSERTION SUCCESS] Webhook 202 Accepted; Oracle PLM updated', type: 'assert', delay: 3300 },
      { text: '----------------------------------------------------------------------', type: 'dimmed', delay: 3450 },
      { text: '[SUMMARY] 1 Scenario Passed, 7 Steps Passed, 0 Failures (Duration: 3.52s)', type: 'pass', delay: 3600 }
    ],
    assertions: 3,
    duration: '3.52s'
  },
  'dynamic-xpath': {
    filename: 'DynamicXPath_ElementResolver.feature',
    code: `Feature: Dynamic XPath Locator Resilience & Flakiness Elimination
  As an Automation Framework Architect
  I want to resolve dynamically generated Oracle PLM DOM nodes
  So that automated tests do not break on release builds

  @Framework @XPathStability @ZeroFlake
  Scenario: Resolve dynamic container with auto-healing XPath
    Given Oracle Cloud PLM generates unpredictable GUID element IDs
    When Test framework queries element using normalized-space & ancestor axes
    Then Locator successfully binds to "Save and Close" button
    And Verify script execution does not encounter NoSuchElementException
    And Log element lookup latency benchmarks`,
    logs: [
      { text: '[INIT] Benchmarking Dynamic XPath Resolution Strategy...', type: 'info', delay: 100 },
      { text: 'Given Oracle Cloud PLM generates unpredictable GUID element IDs', type: 'step', delay: 300 },
      { text: '  --> Target element ID: "pt1:r1:0:cb1_dynamic_887213_a4"', type: 'dimmed', delay: 500 },
      { text: 'When Test framework queries element using normalized-space & ancestor axes', type: 'step', delay: 750 },
      { text: '  --> XPath: //button[contains(@class,"x7j") and contains(text(),"Save")]/ancestor::div[1]', type: 'highlight', delay: 1000 },
      { text: 'Then Locator successfully binds to "Save and Close" button', type: 'step', delay: 1250 },
      { text: '  --> [ASSERTION SUCCESS] Web element found in 28ms without hardcoded waits', type: 'assert', delay: 1500 },
      { text: 'And Verify script execution does not encounter NoSuchElementException', type: 'step', delay: 1750 },
      { text: '  --> [ASSERTION SUCCESS] Flakiness rate reduced by 20% on CI/CD runner', type: 'assert', delay: 2000 },
      { text: 'And Log element lookup latency benchmarks', type: 'step', delay: 2200 },
      { text: '  --> [ASSERTION SUCCESS] Average DOM lookup latency: 0.034s', type: 'assert', delay: 2450 },
      { text: '----------------------------------------------------------------------', type: 'dimmed', delay: 2600 },
      { text: '[SUMMARY] Dynamic XPath Engine Passed (Duration: 2.75s)', type: 'pass', delay: 2750 }
    ],
    assertions: 3,
    duration: '2.75s'
  },
  'smoke-sanity': {
    filename: 'Sprint_Regression_SmokeGate.feature',
    code: `Feature: Sprint Regression Smoke Gate Validation
  As a Senior QA Engineer
  I want to execute prioritized business smoke test scenarios
  So that regression cycle time is reduced by 40% before deployment

  @CriticalPath @SprintGate @ThermoFisher
  Scenario: High-priority business smoke gate execution
    Given Pre-deployment build "v2025.4.1" deployed to QA Staging
    When High-priority business scenarios are executed in parallel
    Then Validate user session persistence & database consistency
    And Assert zero critical/blocker defects in Jira bug tracker
    And Issue automated QA release sign-off report`,
    logs: [
      { text: '[INIT] Executing Thermo Fisher Sprint Smoke Gate...', type: 'info', delay: 100 },
      { text: 'Given Pre-deployment build "v2025.4.1" deployed to QA Staging', type: 'step', delay: 300 },
      { text: 'When High-priority business scenarios are executed in parallel', type: 'step', delay: 600 },
      { text: '  --> Executing 18 prioritized test vectors across 4 worker threads', type: 'highlight', delay: 850 },
      { text: 'Then Validate user session persistence & database consistency', type: 'step', delay: 1100 },
      { text: '  --> [ASSERTION SUCCESS] Database sync verified with Oracle Fusion', type: 'assert', delay: 1350 },
      { text: 'And Assert zero critical/blocker defects in Jira bug tracker', type: 'step', delay: 1600 },
      { text: '  --> [ASSERTION SUCCESS] JQL check: project=TF AND priority in (Blocker, Critical) = 0', type: 'assert', delay: 1850 },
      { text: 'And Issue automated QA release sign-off report', type: 'step', delay: 2100 },
      { text: '  --> [ASSERTION SUCCESS] Release quality sign-off generated and archived in HP ALM', type: 'assert', delay: 2350 },
      { text: '----------------------------------------------------------------------', type: 'dimmed', delay: 2500 },
      { text: '[SUMMARY] Smoke Gate PASSED &bull; 40% Time Saved &bull; 100% Release Ready', type: 'pass', delay: 2650 }
    ],
    assertions: 3,
    duration: '2.65s'
  }
};

function initQASimulator() {
  const scenarioSelector = document.getElementById('scenarioSelector');
  const gherkinContent = document.getElementById('gherkinContent');
  const featureFileName = document.getElementById('featureFileName');
  const runScenarioBtn = document.getElementById('runScenarioBtn');
  const runBtnText = document.getElementById('runBtnText');
  const clearConsoleBtn = document.getElementById('clearConsoleBtn');
  const consoleOutput = document.getElementById('consoleOutput');
  const simStatus = document.getElementById('simStatus');
  const assertCount = document.getElementById('assertCount');
  const passRate = document.getElementById('passRate');
  const execTime = document.getElementById('execTime');

  let isRunning = false;

  function loadScenario(key) {
    const data = SCENARIOS[key];
    if (!data) return;
    if (featureFileName) featureFileName.textContent = data.filename;
    if (gherkinContent) gherkinContent.textContent = data.code;
  }

  if (scenarioSelector) {
    scenarioSelector.addEventListener('change', (e) => {
      if (isRunning) return;
      loadScenario(e.target.value);
    });
  }

  if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener('click', () => {
      if (isRunning) return;
      consoleOutput.innerHTML = `
        <div class="console-line info">[INFO] Terminal reset.</div>
        <div class="console-line dimmed">[READY] Select a scenario and click "Run Automated Test".</div>
      `;
      assertCount.textContent = '0';
      passRate.textContent = '100%';
      execTime.textContent = '0.00s';
      simStatus.textContent = 'Status: Ready';
    });
  }

  if (runScenarioBtn) {
    runScenarioBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;

      const currentScenarioKey = scenarioSelector.value;
      const scenarioData = SCENARIOS[currentScenarioKey];

      runScenarioBtn.disabled = true;
      runBtnText.textContent = 'Executing...';
      simStatus.textContent = 'Status: Running';
      consoleOutput.innerHTML = '';
      assertCount.textContent = '0';
      execTime.textContent = '0.00s';

      let currentAssertions = 0;

      scenarioData.logs.forEach((logItem, index) => {
        setTimeout(() => {
          const lineEl = document.createElement('div');
          lineEl.className = `console-line ${logItem.type}`;
          lineEl.textContent = logItem.text;
          consoleOutput.appendChild(lineEl);
          consoleOutput.scrollTop = consoleOutput.scrollHeight;

          if (logItem.type === 'assert') {
            currentAssertions++;
            assertCount.textContent = currentAssertions;
          }

          // When last line is reached
          if (index === scenarioData.logs.length - 1) {
            isRunning = false;
            runScenarioBtn.disabled = false;
            runBtnText.textContent = 'Run Automated Test';
            simStatus.textContent = 'Status: PASSED';
            execTime.textContent = scenarioData.duration;
            showToast('BDD Scenario executed successfully with 0 defects!', 'success');
          }
        }, logItem.delay);
      });
    });
  }
}

/* ==========================================================================
   6. Framework Architecture Layer Inspector
   ========================================================================== */
const ARCH_LAYERS = {
  1: {
    badge: 'Layer 1: Feature Specifications',
    title: 'Behavior-Driven Development (BDD) Feature Files',
    desc: 'Written in natural, business-readable Gherkin syntax (Given / When / Then). Enables seamless collaboration between Business Analysts, Developers, Product Owners, and QA Validation teams. Each scenario maps 1:1 to business acceptance criteria for Oracle Cloud PLM and enterprise workflows.',
    points: [
      '<strong>Business Alignment:</strong> Accessible to non-technical stakeholders for requirement verification.',
      '<strong>Tag Management:</strong> Granular execution tagging (@Smoke, @Regression, @CCG, @Sanity).',
      '<strong>Scenario Outlines:</strong> Parameterized data-driven testing for multi-country enterprise scenarios.'
    ],
    code: `@OraclePLM @ChangeManagement
Scenario: Create and Approve Engineering Change Order
  Given the QA user has authenticated with Oracle Cloud Fusion
  When an ECO request is initiated for Item Revision "Rev-C"
  Then the system validates regulatory compliance and audit logs`
  },
  2: {
    badge: 'Layer 2: Step Definitions & Business Logic',
    title: 'Java & Cucumber Glue Code Layer',
    desc: 'Binds natural Gherkin expressions to executable Java routines. Handles state transfer, dependency injection, and data transformations. Enforces clean separation of concerns so tests remain maintainable across changing application specifications.',
    points: [
      '<strong>Reusable Step Library:</strong> Common authentication, navigation, and validation methods reused across 400+ tests.',
      '<strong>Clean Abstraction:</strong> Business logic strictly separated from low-level browser interaction.',
      '<strong>Robust Assertions:</strong> Custom TestNG assertions verify both UI DOM states and backend database responses.'
    ],
    code: `@When("User creates a new Change Order for Item {string}")
public void userCreatesNewChangeOrder(String itemCode) {
    ecoPage.initiateChangeOrder(itemCode);
    Assert.assertTrue(ecoPage.isDraftSaved(), "ECO draft failed to initialize");
}`
  },
  3: {
    badge: 'Layer 3: Page Object Model & Dynamic Locators',
    title: 'Dynamic XPath Engine & Page Object Repository',
    desc: 'Encapsulates page web elements and user interactions inside modular Page Objects. I engineered custom dynamic XPath strategies using normalized spaces, ancestor chains, and sibling indexing to withstand unpredictable dynamic IDs generated by Oracle Fusion Cloud.',
    points: [
      '<strong>20% Fewer Failures:</strong> Eliminated fragile absolute locators and brittle synthetic IDs.',
      '<strong>Centralized Maintenance:</strong> UI changes require updating only one locator in the respective Page Object.',
      '<strong>Explicit Synchronization:</strong> Custom WebDriverWait wrappers prevent race conditions and element staleness.'
    ],
    code: `public class OraclePLMChangeOrderPage extends BasePage {
    // Dynamic XPath locating button by normalized text regardless of dynamic parent IDs
    @FindBy(xpath = "//button[normalize-space()='Submit For Approval']")
    private WebElement submitApprovalBtn;
    
    public void submitApproval() {
        waitForElementClickable(submitApprovalBtn).click();
    }
}`
  },
  4: {
    badge: 'Layer 4: Execution & TestNG Engine',
    title: 'Maven Build & Parallel TestNG Orchestration',
    desc: 'Empowers scalable parallel test execution across diverse environments (Chrome Headless, Firefox, Edge). Integrated with Maven surefire plugins and data providers for rapid regression feedback during Agile sprint cycles.',
    points: [
      '<strong>Parallel Execution:</strong> TestNG threads execute test batches concurrently to shrink feedback loops.',
      '<strong>Sprint Prioritization:</strong> Business-critical smoke test packs reduced execution time by nearly 40%.',
      '<strong>Config Driven:</strong> Multi-environment toggles (Dev, QA Staging, UAT Pre-prod) managed via properties files.'
    ],
    code: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="ThermoFisher_OraclePLM_Suite" parallel="classes" thread-count="4">
  <test name="ChangeManagement_Regression">
    <classes>
      <class name="com.vismaya.runners.CucumberRunnerTest"/>
    </classes>
  </test>
</suite>`
  },
  5: {
    badge: 'Layer 5: Reporting, Metrics & Defect Lifecycle',
    title: 'Jira, HP ALM & CMMI/CSV Quality Sign-Off',
    desc: 'Integrates automated defect triage, real-time HTML execution reporting, and full traceability linking. Connects test results to Jira issues, verifies entry/exit criteria, and supports computerized system validation (CSV) for regulated enterprise clients.',
    points: [
      '<strong>100% Traceability (RTM):</strong> Guarantees every functional requirement is mapped to passing test cases.',
      '<strong>Defect Lifecycle Governance:</strong> Automated logs and screenshots captured on failure for rapid triage in Jira/HP ALM.',
      '<strong>Executive Metrics:</strong> Defect density, test execution pass rates, and regression quality readiness reports.'
    ],
    code: `[REPORT] ExtentReports initialized & synchronized with Jira REST API.
[STATUS] 428 Scenarios Verified | 0 Regressions | Pass Rate: 100%
[COMPLIANCE] CMMI Level 5 and CSV validation criteria met for Thermo Fisher deployment.`
  }
};

function initArchitectureInspector() {
  const stepCards = document.querySelectorAll('.arch-step-card');
  const badgeEl = document.getElementById('archDetailBadge');
  const titleEl = document.getElementById('archDetailTitle');
  const descEl = document.getElementById('archDetailDesc');
  const pointsEl = document.getElementById('archDetailPoints');
  const codeEl = document.querySelector('#archDetailCode code');

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      const stepNumber = card.getAttribute('data-step');
      const stepData = ARCH_LAYERS[stepNumber];
      if (!stepData) return;

      // Update active card class
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Update detail panel with animation
      if (badgeEl) badgeEl.textContent = stepData.badge;
      if (titleEl) titleEl.textContent = stepData.title;
      if (descEl) descEl.textContent = stepData.desc;
      if (codeEl) codeEl.textContent = stepData.code;

      if (pointsEl) {
        pointsEl.innerHTML = stepData.points.map(pt => `
          <div class="point-item">&#10003; ${pt}</div>
        `).join('');
      }
    });
  });
}

/* ==========================================================================
   7. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'slideInUp 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Copy to Clipboard Utility & Clickable Contact Cards
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        }).catch(() => {
          showToast('Failed to copy. Please select manually.', 'info');
        });
      }
    });
  });

  // Navigate directly when clicking anywhere on a contact card (except copy or sublink)
  const clickableCards = document.querySelectorAll('.clickable-card');
  clickableCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.copy-btn') || e.target.closest('.c-sublink') || e.target.tagName.toLowerCase() === 'a') {
        return;
      }
      const href = card.getAttribute('data-href');
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    });
  });
}

/* ==========================================================================
   9. Contact Form Simulation
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const submitMsgBtn = document.getElementById('submitMsgBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const topic = document.getElementById('messageTopic').value;
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'info');
        return;
      }

      // Simulate sending
      if (submitMsgBtn) {
        submitMsgBtn.disabled = true;
        submitMsgBtn.innerHTML = `<span>Sending Message...</span>`;
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitMsgBtn) {
          submitMsgBtn.disabled = false;
          submitMsgBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Send Message</span>
          `;
        }
        showToast(`Thank you, ${name}! Your inquiry regarding "${topic}" has been prepared. Vismaya will get back to you shortly.`, 'success');
      }, 1000);
    });
  }
}

/* ==========================================================================
   10. Resume Modal & Print Integration
   ========================================================================== */
function initResumeModal() {
  const openResumeBtn = document.getElementById('openResumeBtn');
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const modalPrintBtn = document.getElementById('modalPrintBtn');
  const resumeModal = document.getElementById('resumeModal');

  function openModal() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openModal);
  if (downloadResumeBtn) downloadResumeBtn.addEventListener('click', openModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Print button
  if (modalPrintBtn) {
    modalPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   Helper: Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success' 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}
