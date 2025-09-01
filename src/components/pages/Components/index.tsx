"use client";
import { useState } from "react";
import classes from "./classes.module.scss";
import Avatar from "@/components/elements/Avatar";
import Badge from "@/components/elements/Badge";
import Button from "@/components/elements/Button";
import Card from "@/components/elements/Card";
import Input from "@/components/elements/Input";
import Loader from "@/components/elements/Loader";
import Alert from "@/components/materials/Alert";
import ChartContainer from "@/components/materials/ChartContainer";
import KPICard from "@/components/materials/KPICard";
import Modal from "@/components/materials/Modal";
import Pagination from "@/components/materials/Pagination";
import Table from "@/components/materials/Table";
import Tabs from "@/components/materials/Tabs";
import Breadcrumbs, { BreadcrumbItem } from "@/components/materials/Breadcrumbs";
import { useToast } from "@/hooks/useToast";
import { ToasterContainer } from "@/components/materials/Toaster";
import { MdHome } from "react-icons/md";

// Static data moved outside component to avoid recreation on each render
const tabItems = [
	{ id: "overview", label: "Overview", content: <div>Overview content</div> },
	{ id: "analytics", label: "Analytics", content: <div>Analytics content</div> },
	{ id: "reports", label: "Reports", content: <div>Reports content</div> },
];

const tableColumns = [
	{ key: "name", title: "Name", sortable: true },
	{ key: "email", title: "Email" },
	{ key: "role", title: "Role" },
	{ key: "status", title: "Status" },
];

const tableData = [
	{ name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
	{ name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
	{ name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Active" },
];

const breadcrumbItems: BreadcrumbItem[] = [
	{ label: "Home", href: "/", icon: <MdHome /> },
	{ label: "UI Kit", href: "/ui-kit" },
	{ label: "Demo", href: "/ui-kit/demo" },
	{ label: "UI Kit", href: "/ui-kit" },
	{ label: "Demo", href: "/ui-kit/demo" },
	{ label: "UI Kit", href: "/ui-kit" },
	{ label: "Demo", href: "/ui-kit/demo" },
	{ label: "UI Kit", href: "/ui-kit" },
	{ label: "Demo", href: "/ui-kit/demo" },
];

export default function Components() {
	const { toasts, toast, removeToast } = useToast();
	const [showModalSmall, setShowModalSmall] = useState(false);
	const [showModalMedium, setShowModalMedium] = useState(false);
	const [showModalLarge, setShowModalLarge] = useState(false);
	const [showModalExtraLarge, setShowModalExtraLarge] = useState(false);
	const [showModalFull, setShowModalFull] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);


	return (
		<main className={classes.root}>
			<div className={classes.container}>
				<div className={classes.section}>
					<h2>Buttons</h2>

					<div className={classes.grid}>
						<Button variant="primary" size="lg">
							Primary Button
						</Button>
						<Button variant="primary" loading size="lg">
							Primary Button
						</Button>
						<Button variant="secondary" size="lg">
							Secondary Button
						</Button>
						<Button variant="secondary" loading size="lg">
							Secondary Button
						</Button>
						<Button variant="outline" size="lg">
							Outline Button
						</Button>
						<Button variant="outline" loading size="lg">
							Outline Button
						</Button>
						<Button variant="ghost" size="lg">
							Ghost Button
						</Button>
						<Button variant="ghost" loading size="lg">
							Ghost Button
						</Button>
						<Button variant="danger" size="lg">
							Danger Button
						</Button>
						<Button variant="danger" loading size="lg">
							Danger Button
						</Button>
					</div>
					<div className={classes.grid}>
						<Button variant="primary">Primary Button</Button>
						<Button variant="primary" loading>
							Primary Button
						</Button>
						<Button variant="secondary">Secondary Button</Button>
						<Button variant="secondary" loading>
							Secondary Button
						</Button>
						<Button variant="outline">Outline Button</Button>
						<Button variant="outline" loading>
							Outline Button
						</Button>
						<Button variant="ghost">Ghost Button</Button>
						<Button variant="ghost" loading>
							Ghost Button
						</Button>
						<Button variant="danger">Danger Button</Button>
						<Button variant="danger" loading>
							Danger Button
						</Button>
					</div>
					<div className={classes.grid}>
						<Button variant="primary" size="sm">
							Primary Button
						</Button>
						<Button variant="primary" size="sm" loading>
							Primary Button
						</Button>
						<Button variant="secondary" size="sm">
							Secondary Button
						</Button>
						<Button variant="secondary" size="sm" loading>
							Secondary Button
						</Button>
						<Button variant="outline" size="sm">
							Outline Button
						</Button>
						<Button variant="outline" size="sm" loading>
							Outline Button
						</Button>
						<Button variant="ghost" size="sm">
							Ghost Button
						</Button>
						<Button variant="ghost" size="sm" loading>
							Ghost Button
						</Button>
						<Button variant="danger" size="sm">
							Danger Button
						</Button>
						<Button variant="danger" size="sm" loading>
							Danger Button
						</Button>
					</div>
				</div>

				<div className={classes.section}>
					<h2>Inputs</h2>
					<div className={classes.grid}>
						<Input placeholder="Default input" size="lg" />
						<Input placeholder="With label" label="Email" size="lg" />
						<Input placeholder="Error state" state="error" helperText="This field is required" size="lg" />
						<Input placeholder="Success state" state="success" helperText="Looks good!" size="lg" />
					</div>
					<div className={classes.grid}>
						<Input placeholder="Default input" />
						<Input placeholder="With label" label="Email" />
						<Input placeholder="Error state" state="error" helperText="This field is required" />
						<Input placeholder="Success state" state="success" helperText="Looks good!" />
					</div>
					<div className={classes.grid}>
						<Input placeholder="Default input" size="sm" />
						<Input placeholder="With label" label="Email" size="sm" />
						<Input placeholder="Error state" state="error" helperText="This field is required" size="sm" />
						<Input placeholder="Success state" state="success" helperText="Looks good!" size="sm" />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Cards</h2>
					<div className={classes.grid}>
						<Card variant="default" hoverable padding="lg">
							<p>This is a simple card with some default content.</p>
						</Card>
						<Card variant="bordered" hoverable padding="lg">
							<p>This is a simple card with some bordered content.</p>
						</Card>
						<Card variant="elevated" hoverable padding="lg">
							<p>This is a simple card with some elevated content.</p>
						</Card>
						<Card variant="outlined" hoverable padding="lg">
							<p>This is a simple card with some outlined content.</p>
						</Card>
					</div>
					<div className={classes.grid}>
						<Card variant="default" hoverable>
							<p>This is a simple card with some default content.</p>
						</Card>
						<Card variant="bordered" hoverable>
							<p>This is a simple card with some bordered content.</p>
						</Card>
						<Card variant="elevated" hoverable>
							<p>This is a simple card with some elevated content.</p>
						</Card>
						<Card variant="outlined" hoverable>
							<p>This is a simple card with some outlined content.</p>
						</Card>
					</div>
					<div className={classes.grid}>
						<Card variant="default" hoverable padding="sm">
							<p>This is a simple card with some default content.</p>
						</Card>
						<Card variant="bordered" hoverable padding="sm">
							<p>This is a simple card with some bordered content.</p>
						</Card>
						<Card variant="elevated" hoverable padding="sm">
							<p>This is a simple card with some elevated content.</p>
						</Card>
						<Card variant="outlined" hoverable padding="sm">
							<p>This is a simple card with some outlined content.</p>
						</Card>
					</div>
				</div>

				<div className={classes.section}>
					<h2>Breadcrumbs</h2>
					<Breadcrumbs items={breadcrumbItems} />
				</div>

				<div className={classes.section}>
					<h2>KPIs</h2>
					<div className={classes.grid}>
						<KPICard title="Total Revenue" value="$124,560" icon="💰" trend="up" trendValue="+12.5%" trendLabel="from last month" size="lg" />
						<KPICard title="Active Users" value="2,847" icon="👥" trend="down" trendValue="-2.3%" trendLabel="from last week" size="lg" />
						<KPICard title="New Signups" value="1,234" icon="🆕" trend="neutral" trendValue="0%" trendLabel="from last week" size="lg" />
					</div>
					<div className={classes.grid}>
						<KPICard title="Total Revenue" value="$124,560" icon="💰" trend="up" trendValue="+12.5%" trendLabel="from last month" size="lg" loading />
						<KPICard title="Active Users" value="2,847" icon="👥" trend="down" trendValue="-2.3%" trendLabel="from last week" size="lg" loading />
						<KPICard title="New Signups" value="1,234" icon="🆕" trend="neutral" trendValue="0%" trendLabel="from last week" size="lg" loading />
					</div>
					<div className={classes.grid}>
						<KPICard title="Total Revenue" value="$124,560" icon="💰" trend="up" trendValue="+12.5%" trendLabel="from last month" size="md" />
						<KPICard title="Active Users" value="2,847" icon="👥" trend="down" trendValue="-2.3%" trendLabel="from last week" size="md" />
						<KPICard title="New Signups" value="1,234" icon="🆕" trend="neutral" trendValue="0%" trendLabel="from last week" size="md" />
					</div>
					<div className={classes.grid}>
						<KPICard title="Total Revenue" value="$124,560" icon="💰" trend="up" trendValue="+12.5%" trendLabel="from last month" size="md" loading />
						<KPICard title="Active Users" value="2,847" icon="👥" trend="down" trendValue="-2.3%" trendLabel="from last week" size="md" loading />
						<KPICard title="New Signups" value="1,234" icon="🆕" trend="neutral" trendValue="0%" trendLabel="from last week" size="md" loading />
					</div>
					<div className={classes.grid}>
						<KPICard title="Total Revenue" value="$124,560" icon="💰" trend="up" trendValue="+12.5%" trendLabel="from last month" size="sm" />
						<KPICard title="Active Users" value="2,847" icon="👥" trend="down" trendValue="-2.3%" trendLabel="from last week" size="sm" />
						<KPICard title="New Signups" value="1,234" icon="🆕" trend="neutral" trendValue="0%" trendLabel="from last week" size="sm" />
					</div>
					<div className={classes.grid}>
						<KPICard title="Total Revenue" value="$124,560" icon="💰" trend="up" trendValue="+12.5%" trendLabel="from last month" size="sm" loading />
						<KPICard title="Active Users" value="2,847" icon="👥" trend="down" trendValue="-2.3%" trendLabel="from last week" size="sm" loading />
						<KPICard title="New Signups" value="1,234" icon="🆕" trend="neutral" trendValue="0%" trendLabel="from last week" size="sm" loading />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Badges</h2>
					<div className={classes.flexRow}>
						<Badge variant="default" size="lg">
							Default
						</Badge>
						<Badge variant="primary" size="lg">
							Primary
						</Badge>
						<Badge variant="success" size="lg">
							Success
						</Badge>
						<Badge variant="warning" size="lg">
							Warning
						</Badge>
						<Badge variant="danger" size="lg">
							Danger
						</Badge>
						<Badge variant="success" size="lg">
							Success
						</Badge>
						<Badge variant="info" size="lg">
							Info
						</Badge>
					</div>
					<div className={classes.flexRow}>
						<Badge variant="default">Default</Badge>
						<Badge variant="primary">Primary</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="danger">Danger</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="info">Info</Badge>
					</div>
					<div className={classes.flexRow}>
						<Badge variant="default" size="sm">
							Default
						</Badge>
						<Badge variant="primary" size="sm">
							Primary
						</Badge>
						<Badge variant="success" size="sm">
							Success
						</Badge>
						<Badge variant="warning" size="sm">
							Warning
						</Badge>
						<Badge variant="danger" size="sm">
							Danger
						</Badge>
						<Badge variant="success" size="sm">
							Success
						</Badge>
						<Badge variant="info" size="sm">
							Info
						</Badge>
					</div>
					<div className={classes.flexRow}>
						<Badge dot variant="success" size="lg">
							Online
						</Badge>
						<Badge dot variant="danger" size="lg">
							Offline
						</Badge>
						<Badge dot variant="info" size="lg">
							Away
						</Badge>
					</div>
					<div className={classes.flexRow}>
						<Badge dot variant="success">
							Online
						</Badge>
						<Badge dot variant="danger">
							Offline
						</Badge>
						<Badge dot variant="info">
							Away
						</Badge>
					</div>
					<div className={classes.flexRow}>
						<Badge dot variant="success" size="sm">
							Online
						</Badge>
						<Badge dot variant="danger" size="sm">
							Offline
						</Badge>
						<Badge dot variant="info" size="sm">
							Away
						</Badge>
					</div>
				</div>

				<div className={classes.section}>
					<h2> Avatars</h2>
					<div className={classes.flexRow}>
						<Avatar name="Jane Smith" size="xs" />
						<Avatar name="David Johnson" size="sm" />
						<Avatar name="Michael Brown" size="md" />
						<Avatar name="Emily Davis" size="lg" />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Alerts</h2>
					<div className={classes.grid}>
						<Alert variant="info" title="Information" size="lg" closable onClose={() => {}}>
							This is an informational alert message.
						</Alert>
						<Alert variant="success" title="Success!" size="lg" closable onClose={() => {}}>
							Operation completed successfully.
						</Alert>
						<Alert variant="warning" title="Warning" size="lg" closable onClose={() => {}}>
							Please check your input data.
						</Alert>
						<Alert variant="danger" title="Error" size="lg" closable onClose={() => {}}>
							Something went wrong.
						</Alert>
					</div>
					<div className={classes.grid}>
						<Alert variant="info" title="Information" size="lg">
							This is an informational alert message.
						</Alert>
						<Alert variant="success" title="Success!" size="lg">
							Operation completed successfully.
						</Alert>
						<Alert variant="warning" title="Warning" size="lg">
							Please check your input data.
						</Alert>
						<Alert variant="danger" title="Error" size="lg">
							Something went wrong.
						</Alert>
					</div>
					<div className={classes.grid}>
						<Alert variant="info" title="Information" closable onClose={() => {}}>
							This is an informational alert message.
						</Alert>
						<Alert variant="success" title="Success!" closable onClose={() => {}}>
							Operation completed successfully.
						</Alert>
						<Alert variant="warning" title="Warning" closable onClose={() => {}}>
							Please check your input data.
						</Alert>
						<Alert variant="danger" title="Error" closable onClose={() => {}}>
							Something went wrong.
						</Alert>
					</div>
					<div className={classes.grid}>
						<Alert variant="info" title="Information">
							This is an informational alert message.
						</Alert>
						<Alert variant="success" title="Success!">
							Operation completed successfully.
						</Alert>
						<Alert variant="warning" title="Warning">
							Please check your input data.
						</Alert>
						<Alert variant="danger" title="Error">
							Something went wrong.
						</Alert>
					</div>
					<div className={classes.grid}>
						<Alert variant="info" title="Information" size="sm" closable onClose={() => {}}>
							This is an informational alert message.
						</Alert>
						<Alert variant="success" title="Success!" size="sm" closable onClose={() => {}}>
							Operation completed successfully.
						</Alert>
						<Alert variant="warning" title="Warning" size="sm" closable onClose={() => {}}>
							Please check your input data.
						</Alert>
						<Alert variant="danger" title="Error" size="sm" closable onClose={() => {}}>
							Something went wrong.
						</Alert>
					</div>
					<div className={classes.grid}>
						<Alert variant="info" title="Information" size="sm">
							This is an informational alert message.
						</Alert>
						<Alert variant="success" title="Success!" size="sm">
							Operation completed successfully.
						</Alert>
						<Alert variant="warning" title="Warning" size="sm">
							Please check your input data.
						</Alert>
						<Alert variant="danger" title="Error" size="sm">
							Something went wrong.
						</Alert>
					</div>
				</div>

				<div className={classes.section}>
					<h2>Loading</h2>
					<div className={classes.flexRow}>
						<Loader variant="dots" label="Loading..." size="xl" />
						<Loader variant="dots" label="Loading..." size="lg" />
						<Loader variant="dots" label="Loading..." />
						<Loader variant="dots" label="Loading..." size="sm" />
					</div>
					<div className={classes.flexRow}>
						<Loader size="xl" variant="primary" />
						<Loader size="lg" variant="primary" />
						<Loader size="md" />
						<Loader size="sm" />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Tabs</h2>
					<div className={classes.flexRow}>
						<h3>Large</h3>
						<Tabs items={tabItems} size="lg" variant="pills" />
						<Tabs items={tabItems} size="lg" variant="default" />
						<Tabs items={tabItems} size="lg" variant="underline" />
					</div>
					<div className={classes.flexRow}>
						<h3>Medium</h3>
						<Tabs items={tabItems} size="md" variant="pills" />
						<Tabs items={tabItems} size="md" variant="default" />
						<Tabs items={tabItems} size="md" variant="underline" />
					</div>
					<div className={classes.flexRow}>
						<h3>Small</h3>
						<Tabs items={tabItems} size="sm" variant="pills" />
						<Tabs items={tabItems} size="sm" variant="default" />
						<Tabs items={tabItems} size="sm" variant="underline" />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Chart Container</h2>
					<ChartContainer
						title="Revenue Over Time"
						subtitle="Monthly revenue for the past year"
						actions={
							<Button size="sm" variant="outline">
								Export
							</Button>
						}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: "100%",
								color: "var(--color-text-muted)",
							}}>
							📊 Chart would go here
						</div>
					</ChartContainer>
				</div>

				<div className={classes.section}>
					<h2>Table </h2>
					<div className={classes.flexRow}>
						<Table columns={tableColumns} data={tableData} hoverable compact sortDirection="desc" />
						<Table columns={tableColumns} data={tableData} hoverable striped sortDirection="desc" />
						<Table columns={tableColumns} data={tableData} hoverable bordered sortDirection="desc" />
						<Table columns={[]} data={[]} hoverable sortDirection="desc" />
						<Table columns={tableColumns} data={tableData} hoverable loading sortDirection="desc" />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Pagination </h2>
					<div style={{ marginTop: "var(--spacing-4)", display: "flex", justifyContent: "center" }}>
						<Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} size="lg" />
					</div>
					<div style={{ marginTop: "var(--spacing-4)", display: "flex", justifyContent: "center" }}>
						<Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} size="md" />
					</div>
					<div style={{ marginTop: "var(--spacing-4)", display: "flex", justifyContent: "center" }}>
						<Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} size="sm" />
					</div>
				</div>

				<div className={classes.section}>
					<h2>Toaster</h2>
					<div className={classes.flexRow}>
						<Button onClick={() => toast.success("Operation completed successfully!", "Success")}>Show Success Toast</Button>
						<Button variant="danger" onClick={() => toast.error("Something went wrong!", "Error")}>
							Show Error Toast
						</Button>
						<Button variant="secondary" onClick={() => toast.warning("Please check your input.", "Warning")}>
							Show Warning Toast
						</Button>
						<Button variant="outline" onClick={() => toast.info("Here's some useful information.", "Info")}>
							Show Info Toast
						</Button>
					</div>
				</div>

				<div className={classes.section}>
					<h2>Modal</h2>
					<div className={classes.flexRow}>
						<Button onClick={() => setShowModalSmall(true)}>Open Small Modal</Button>
						<Button onClick={() => setShowModalMedium(true)}>Open Medium Modal</Button>
						<Button onClick={() => setShowModalLarge(true)}>Open Large Modal</Button>
						<Button onClick={() => setShowModalExtraLarge(true)}>Open Extra Large Modal</Button>
						<Button onClick={() => setShowModalFull(true)}>Open Full Modal</Button>
					</div>
				</div>

				<Modal
					isOpen={showModalSmall}
					onClose={() => setShowModalSmall(false)}
					title="Demo Modal"
					size="sm"
					footer={
						<div style={{ display: "flex", gap: "var(--spacing-3)" }}>
							<Button variant="outline" onClick={() => setShowModalSmall(false)}>
								Cancel
							</Button>
							<Button onClick={() => setShowModalSmall(false)}>Confirm</Button>
						</div>
					}>
					<p>This is a demo modal with some content.</p>
				</Modal>

				<Modal
					isOpen={showModalMedium}
					onClose={() => setShowModalMedium(false)}
					title="Demo Modal"
					size="md"
					footer={
						<div style={{ display: "flex", gap: "var(--spacing-3)" }}>
							<Button variant="outline" onClick={() => setShowModalMedium(false)}>
								Cancel
							</Button>
							<Button onClick={() => setShowModalMedium(false)}>Confirm</Button>
						</div>
					}>
					<p>This is a demo modal with some content.</p>
				</Modal>

				<Modal
					isOpen={showModalLarge}
					onClose={() => setShowModalLarge(false)}
					title="Demo Modal"
					size="lg"
					footer={
						<div style={{ display: "flex", gap: "var(--spacing-3)" }}>
							<Button variant="outline" onClick={() => setShowModalLarge(false)}>
								Cancel
							</Button>
							<Button onClick={() => setShowModalLarge(false)}>Confirm</Button>
						</div>
					}>
					<p>This is a demo modal with some content.</p>
				</Modal>

				<Modal
					isOpen={showModalExtraLarge}
					onClose={() => setShowModalExtraLarge(false)}
					title="Demo Modal"
					size="xl"
					footer={
						<div style={{ display: "flex", gap: "var(--spacing-3)" }}>
							<Button variant="outline" onClick={() => setShowModalExtraLarge(false)}>
								Cancel
							</Button>
							<Button onClick={() => setShowModalExtraLarge(false)}>Confirm</Button>
						</div>
					}>
					<p>This is a demo modal with some content.</p>
				</Modal>

				<Modal
					isOpen={showModalFull}
					onClose={() => setShowModalFull(false)}
					title="Demo Modal"
					size="full"
					footer={
						<div style={{ display: "flex", gap: "var(--spacing-3)" }}>
							<Button variant="outline" onClick={() => setShowModalFull(false)}>
								Cancel
							</Button>
							<Button onClick={() => setShowModalFull(false)}>Confirm</Button>
						</div>
					}>
					<p>This is a demo modal with some content.</p>
				</Modal>

				<ToasterContainer toasts={toasts} onRemove={removeToast} />
			</div>
		</main>
	);
}
