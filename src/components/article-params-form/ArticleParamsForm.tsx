import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
import { Select } from '../select';
import { fontFamilyOptions } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { fontSizeOptions } from 'src/constants/articleProps';
import { fontColors } from 'src/constants/articleProps';
import { backgroundColors } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { contentWidthArr } from 'src/constants/articleProps';
import { Text } from '../text';
import { OptionType } from 'src/constants/articleProps';
import type { CustomCSSProperties } from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: CustomCSSProperties;
	setArticleState: (state: CustomCSSProperties) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}) => {
	const [updatedArticleState, setUpdatedArticleState] =
		useState<CustomCSSProperties>(articleState);

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const onOpen = () => {
		setIsOpen(true);
	};

	useEffect(() => {
		if (isOpen) {
			const handleClickOutside = (event: MouseEvent) => {
				if (ref.current && !ref.current.contains(event.target as Node)) {
					setIsOpen(false);
				}
			};

			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [isOpen]);

	const findSelectedOption = (
		options: OptionType[],
		value: string | undefined
	) => {
		if (!value) return null;
		return options.find((option) => option.value === value);
	};

	const handleFontFamilyChange = (value: OptionType) => {
		setUpdatedArticleState({
			...updatedArticleState,
			'--font-family': value.value,
		});
	};

	const handleFontSizeChange = (value: OptionType) => {
		setUpdatedArticleState({
			...updatedArticleState,
			'--font-size': value.value,
		});
	};

	const handleFontColorChange = (value: OptionType) => {
		setUpdatedArticleState({
			...updatedArticleState,
			'--font-color': value.value,
		});
	};

	const handleBackgroundColorChange = (value: OptionType) => {
		setUpdatedArticleState({
			...updatedArticleState,
			'--bg-color': value.value,
		});
	};

	const handleContentWidthChange = (value: OptionType) => {
		setUpdatedArticleState({
			...updatedArticleState,
			'--container-width': value.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(updatedArticleState);
	};

	const handleReset = () => {
		setUpdatedArticleState(articleState);
	};

	return (
		<>
			<ArrowButton onOpen={onOpen} isOpen={isOpen} />
			<aside
				ref={ref}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} style={{ gap: 50 }}>
					<Text as='h2' size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={
							findSelectedOption(
								fontFamilyOptions,
								updatedArticleState['--font-family']
							) || null
						}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={
							findSelectedOption(
								fontSizeOptions,
								updatedArticleState['--font-size']
							)!
						}
						name='font-size'
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={
							findSelectedOption(
								fontColors,
								updatedArticleState['--font-color']
							) || null
						}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={
							findSelectedOption(
								backgroundColors,
								updatedArticleState['--bg-color']
							) || null
						}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={findSelectedOption(
							contentWidthArr, updatedArticleState['--container-width']
						) || null}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' onSubmit={handleSubmit} />
					</div>
				</form>
			</aside>
		</>
	);
};
