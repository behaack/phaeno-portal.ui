import { JSX } from "react";

export interface IProps {
  children: JSX.Element
}

export function HeaderContainer({ children }: IProps) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-inner">
          <div className="flex items-center">
            <div className="logo-group">
              <img
                className="logo"
                alt="Phaeno logo"
                src="/phaeno124x40.webp"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            { children }
          </div>
        </div>
      </div>
    </header>
  );
}
