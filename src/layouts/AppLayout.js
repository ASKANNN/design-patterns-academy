import { Header }    from '../components/layout/Header.js';
import { MobileNav } from '../components/layout/Nav.js';
import { Footer }    from '../components/layout/Footer.js';

export function AppLayout() {
  return `
    ${Header()}
    ${MobileNav()}
    <main class="main" id="main-content" tabindex="-1">
      <div id="router-outlet"></div>
    </main>
    ${Footer()}
  `;
}
