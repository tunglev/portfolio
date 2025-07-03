'use strict'




class BrowserSizeWarning extends HTMLElement {
	// connectedCallback() {
	// 	this.innerHTML = `
    //     <div class="browser-warning-block">
	// 		<p class="browser-warning-text" style="font-size: 4vh; font-weight: 600; color: #7a7a7a">
	// 			Phone responsivity under development
	// 			<br><span style ="font-size: 2.5vh; color: white; margin-top: 2.5vh;">Please open my portfolio on a COMPUTER or TABLET for the best experience</span>
	// 		</p>
    // 	</div>
    // 	`
	// }
}
customElements.define('browser-size-warning', BrowserSizeWarning)

class GoogleAnalytics extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<!-- Google tag (gtag.js) -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-H2L6PR300T"></script>
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-H2L6PR300T');
			</script>
    	`
	}
}
customElements.define('google-analytics', GoogleAnalytics)

class BackToMain extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
        <a href="javascript:history.length > 1 ? history.back() : location.href='/';" style="display: inline-block; border-radius: 5px; font-size: large;  border: 2px solid hsl(0, 0%, 50%); color: hsl(0, 0%, 75%); padding: 10px 30px; margin-bottom: 6%; ">🡤 Back</a>
    `;
	}
}
customElements.define('back-btn', BackToMain)

class EmptyLine extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<h1>‎</h1>
    `
	}
}
customElements.define('empty-line', EmptyLine)

class Banner extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute("src");
	const blur = this.getAttribute("blur");
    this.innerHTML = `
		<div style="
          margin: 0;
          padding: 0;
          position:absolute; left: 0; top: 0; right: 0; bottom: 0;
          width: 98vw; height: 75vh; 
          background: url(${src});
          background-attachment: fixed;
          background-position: center;
          background-repeat: repeat;
          background-size:cover;
		  filter: blur(${blur});
		  "
        ></div>
	`; // Example content using the attribute
  }
}

customElements.define('banner-bg', Banner); // Register the element


// element toggle function
const elementToggleFunc = function (elem) {
	elem.classList.toggle('active')
}

// sidebar variables
const sidebar = document.querySelector('[data-sidebar]')
const sidebarBtn = document.querySelector('[data-sidebar-btn]')

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener('click', function () {
	elementToggleFunc(sidebar)
})

// testimonials variables
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]')
const modalContainer = document.querySelector('[data-modal-container]')
const modalCloseBtn = document.querySelector('[data-modal-close-btn]')
const overlay = document.querySelector('[data-overlay]')

// modal variable
const modalImg = document.querySelector('[data-modal-img]')
const modalTitle = document.querySelector('[data-modal-title]')
const modalText = document.querySelector('[data-modal-text]')

// modal toggle function
const testimonialsModalFunc = function () {
	modalContainer.classList.toggle('active')
	overlay.classList.toggle('active')
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
	testimonialsItem[i].addEventListener('click', function () {
		modalImg.src = this.querySelector('[data-testimonials-avatar]').src
		modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt
		modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML
		modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML

		testimonialsModalFunc()
	})
}

// add click event to modal close button
modalCloseBtn.addEventListener('click', testimonialsModalFunc)
overlay.addEventListener('click', testimonialsModalFunc)

// custom select variables
const select = document.querySelector('[data-select]')
const selectItems = document.querySelectorAll('[data-select-item]')
const selectValue = document.querySelector('[data-selecct-value]')
const filterBtn = document.querySelectorAll('[data-filter-btn]')

select.addEventListener('click', function () {
	elementToggleFunc(this)
})

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener('click', function () {
		let selectedValue = this.innerText
		selectValue.innerText = this.innerText
		elementToggleFunc(select)
		filterFunc(selectedValue)
	})
}

// filter variables
const filterItems = document.querySelectorAll('[data-filter-item]')

const filterFunc = function (selectedValue) {
	for (let i = 0; i < filterItems.length; i++) {
		filterItems[i].classList.remove('active');
		if (selectedValue === 'all') {
			filterItems[i].classList.add('active')
		} else if (filterItems[i].dataset.category.toLowerCase().includes(selectedValue.toLowerCase())) {
			filterItems[i].classList.add('active');
		} else {
			filterItems[i].classList.remove('active');
		}
	}
}
// initial page
filterFunc('Highlights⭐');
// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0]

for (let i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener('click', function () {
		let selectedValue = this.innerText.toLowerCase()
		selectValue.innerText = this.innerText
		filterFunc(selectedValue)

		lastClickedBtn.classList.remove('active')
		this.classList.add('active')
		lastClickedBtn = this
	})
}

// contact form variables
const form = document.querySelector('[data-form]')
const formInputs = document.querySelectorAll('[data-form-input]')
const formBtn = document.querySelector('[data-form-btn]')

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener('input', function () {
		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute('disabled')
		} else {
			formBtn.setAttribute('disabled', '')
		}
	})
}

// page navigation variables
const navigationLinks = document.querySelectorAll('[data-nav-link]')
const pages = document.querySelectorAll('[data-page]')

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener('click', function () {
		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add('active')
				navigationLinks[i].classList.add('active')
				window.scrollTo(0, 0)
			} else {
				pages[i].classList.remove('active')
				navigationLinks[i].classList.remove('active')
			}
		}
	})
}


