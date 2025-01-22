import { useState, useEffect, useRef, RefObject } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Layout.module.css";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";
import { IconButton } from "@fluentui/react";

const Layout = () => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef: RefObject<HTMLDivElement> = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer} ref={menuRef}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <svg class="display--block c-logo" width="136" height="20" viewBox="0 0 272 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.96388 23.0347L21.6403 28.2746C22.3286 28.5503 23.0731 28.7019 23.8295 28.7205C24.5859 28.7391 25.3389 28.6242 26.0437 28.3828C26.7486 28.1413 27.3909 27.7781 27.9327 27.3148C28.4744 26.8515 28.9045 26.2975 29.1975 25.6856L32.8136 16.6925L21.7392 12.4561C20.5902 11.9623 19.2891 11.8101 18.0326 12.0224C16.7762 12.2347 15.6328 12.8 14.7753 13.6329L6.96388 23.0347ZM19.8887 31.7058L0 24.7442L11.484 12.357C13.9278 9.73088 18.9988 9.08676 22.9963 10.6228L36.3732 15.7882L32.63 26.9367C31.2174 31.2103 25.4259 33.6382 19.917 31.6934" fill="#E68E48"></path><path d="M27.248 2.38528L24.4229 6.28724C23.7308 7.22867 24.5783 8.59126 26.344 9.27256L34.5227 12.4685L36.3873 7.82328C36.7263 6.96856 35.8081 5.81655 34.339 5.22196L27.248 2.38528ZM36.5285 15.2928L25.2281 10.9448C21.8097 9.61941 20.2841 6.99332 21.7249 5.24672L25.7507 0.35376L34.8476 4.06992C37.489 5.13522 39.2124 7.20389 38.6756 8.80184L36.5285 15.2928Z" fill="#088ECB"></path><path d="M39.1556 19.1207L37.2345 26.4168C37.0578 27.4144 37.268 28.4351 37.8315 29.3155C38.3949 30.196 39.279 30.8851 40.3421 31.2725L50.5549 34.9887L50.795 26.3176C50.7361 25.4701 50.4141 24.6529 49.8639 23.9543C49.3137 23.2556 48.5562 22.7022 47.6733 22.3537L39.1556 19.1207ZM53.9168 39.6463L39.7912 34.5675C35.4688 33.0191 32.9121 28.634 34.028 25.2028L36.952 16.0115L47.8569 20.2231C49.4573 20.8665 50.8364 21.8681 51.8555 23.1271C52.8746 24.3861 53.4978 25.8581 53.6625 27.3953L53.9168 39.6463Z" fill="#93268E"></path><path d="M45.8376 13.5337L49.7504 15.0821C50.4284 15.3422 50.9793 15.1812 50.9934 14.7352V12.2578L47.3773 10.7961C46.7558 10.5484 46.2049 10.6598 46.1484 11.0562L45.8376 13.5337ZM53.1829 11.7251L53.2677 15.6395C53.2677 17.0145 51.6856 17.5595 49.6656 16.7667L43.1396 14.1902L43.9448 10.1519C44.1708 9.0247 45.7953 8.7522 47.5892 9.47065L53.1829 11.7251Z" fill="#89A845"></path><path d="M230.951 10.6228H207.743V13.348H217.575V29.3151H221.134V13.348H230.951V10.6228Z" fill="white"></path><path d="M239.074 10.6228H235.515V29.3151H239.074V10.6228Z" fill="white"></path><path d="M257.395 29.464C260.969 29.464 262.593 27.9032 263.907 25.5744L271.111 10.4868H267.184L260.206 24.9303C259.976 25.4186 259.583 25.8347 259.079 26.1242C258.575 26.4137 257.983 26.5632 257.381 26.553C256.781 26.5686 256.19 26.4242 255.685 26.1389C255.181 25.8535 254.787 25.4407 254.556 24.955L247.493 10.4868H243.58L250.841 25.5992C252.14 27.9032 253.75 29.464 257.338 29.464" fill="white"></path><path d="M194 13.3978C194.6 13.3822 195.191 13.5266 195.696 13.8119C196.2 14.0972 196.594 14.51 196.825 14.9957L203.888 29.464H207.815L200.484 14.3516C199.184 12.0476 197.56 10.4868 193.986 10.4868C190.412 10.4868 188.788 12.0476 187.474 14.3764L180.228 29.464H184.14L191.132 15.0205C191.361 14.5312 191.753 14.1141 192.258 13.8244C192.762 13.5347 193.355 13.386 193.958 13.3978" fill="white"></path><path d="M159.958 18.6624L161.695 20.9788L162.345 21.8459C166.865 27.8908 167.995 29.2782 172.925 29.2782H175.679V10.5735H172.12V26.0947H171.555C169.238 26.0947 169.097 25.9088 165.636 21.2388L163.899 18.9225L163.249 18.0554C158.729 12.0104 157.599 10.623 152.669 10.623H149.844V29.3277H153.389V13.8066H153.968C156.285 13.8066 156.426 13.9924 159.887 18.6624" fill="white"></path><path d="M84.6545 13.6332V10.6355H70.529C63.2402 10.6355 60.2598 13.3359 60.2598 19.9755C60.2598 26.615 63.2402 29.3278 70.529 29.3278H84.6545V26.2929H70.529C64.3985 26.2929 63.9183 23.5554 63.9183 19.9755C63.9183 16.3956 64.3985 13.6332 70.529 13.6332H84.6545Z" fill="white"></path><path d="M103.018 26.7264C95.9551 26.7264 92.8192 26.0823 92.8192 19.9754C92.8192 13.8685 95.9268 13.2367 103.018 13.2367C110.589 13.2367 112.779 14.1162 112.779 19.9754C112.779 25.8345 110.575 26.7264 103.018 26.7264ZM103.018 10.3381C92.5367 10.3381 89.1748 12.6793 89.1748 19.9754C89.1748 27.2714 92.5791 29.6374 103.018 29.6374C113.457 29.6374 116.423 27.3829 116.423 20.0001C116.423 12.6174 113.287 10.3629 103.018 10.3629" fill="white"></path><path d="M121.028 19.9506C121.028 26.6149 123.981 29.3277 131.255 29.3277H145.381V19.5914H141.821V26.2928H131.269C125.181 26.2928 124.701 23.5553 124.701 19.963C124.701 16.3707 125.181 13.6455 131.269 13.6455H145.112V10.623H131.269C123.995 10.623 121.042 13.3358 121.042 19.9506" fill="white"></path></svg>
                    </Link>
                    <nav>
                        <ul className={`${styles.headerNavList} ${menuOpen ? styles.show : ""}`}>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t("chat")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/qa"
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t("qa")}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.loginMenuContainer}>
                        {useLogin && <LoginButton />}
                        <IconButton
                            iconProps={{ iconName: "GlobalNavButton" }}
                            className={styles.menuToggle}
                            onClick={toggleMenu}
                            ariaLabel={t("labels.toggleMenu")}
                        />
                    </div>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
