import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
	onSubmit,
}: {
	title: string;
	onClick?: () => void;
	onSubmit?: (e: React.FormEvent) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button className={styles.button} type={type} onClick={onClick || onSubmit}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
