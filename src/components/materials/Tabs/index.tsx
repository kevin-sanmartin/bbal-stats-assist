import { ReactNode, useState } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export interface TabItem {
	id: string;
	label: string;
	content: ReactNode;
	disabled?: boolean;
	icon?: ReactNode;
	badge?: string | number;
}

export type TabsVariant = "default" | "pills" | "underline";

interface TabsProps {
	items: TabItem[];
	defaultActiveTab?: string;
	activeTab?: string;
	onTabChange?: (tabId: string) => void;
	variant?: TabsVariant;
	fullWidth?: boolean;
	className?: string;
}

export default function Tabs({ items, defaultActiveTab, activeTab: controlledActiveTab, onTabChange, variant = "default", fullWidth = false, className }: TabsProps) {
	const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab || items[0]?.id);

	const activeTab = controlledActiveTab ?? internalActiveTab;
	const activeTabContent = items.find((item) => item.id === activeTab)?.content;

	const handleTabClick = (tabId: string) => {
		if (controlledActiveTab === undefined) {
			setInternalActiveTab(tabId);
		}
		onTabChange?.(tabId);
	};

	const tabsClasses = classNames(classes.tabs, classes[`variant-${variant}`], { [classes.fullWidth]: fullWidth }, className);

	return (
		<div className={classes.container}>
			<div className={tabsClasses} role="tablist">
				{items.map((item) => {
					const isActive = item.id === activeTab;

					const tabClasses = [classes.tab, isActive && classes.active, item.disabled && classes.disabled].filter(Boolean).join(" ");

					return (
						<button
							key={item.id}
							className={tabClasses}
							role="tab"
							aria-selected={isActive}
							aria-controls={`tabpanel-${item.id}`}
							onClick={() => !item.disabled && handleTabClick(item.id)}
							disabled={item.disabled}>
							{item.icon && <span className={classes.icon}>{item.icon}</span>}
							<span className={classes.label}>{item.label}</span>
							{item.badge && <span className={classes.badge}>{item.badge}</span>}
						</button>
					);
				})}
			</div>

			{activeTabContent && (
				<div className={classes.content} role="tabpanel" id={`tabpanel-${activeTab}`}>
					{activeTabContent}
				</div>
			)}
		</div>
	);
}
