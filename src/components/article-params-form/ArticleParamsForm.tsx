import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import { useClose } from './hooks/useClose';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	initialArticleState
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';

import { Separator } from '../separator';

import { Text } from '../text';

import type { CustomCSSProperties } from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: CustomCSSProperties;
	setArticleState: (state: CustomCSSProperties) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [updatedArticleState, setUpdatedArticleState] =
		useState<CustomCSSProperties>(articleState);

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const onOpen = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	useClose({
		isOpen,
		onClose,
		rootRef: ref,
	});

	const findSelectedOption = (
		options: OptionType[],
		value: string | undefined
	) => {
		if (!value) return null;
		return options.find((option) => option.value === value);
	};

	const handlePropertyChange = (property: string, value: OptionType) => {
		setUpdatedArticleState({
		  ...updatedArticleState,
		  [property]: value.value,
		});
	};

	const handleFontFamilyChange = (value: OptionType) => {
		handlePropertyChange('--font-family', value);
	};

	const handleFontSizeChange = (value: OptionType) => {
		handlePropertyChange('--font-size', value);
	};

	const handleFontColorChange = (value: OptionType) => {
		handlePropertyChange('--font-color', value);
	};

	const handleBackgroundColorChange = (value: OptionType) => {
		handlePropertyChange('--bg-color', value);
	};

	const handleContentWidthChange = (value: OptionType) => {
		handlePropertyChange('--container-width', value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(updatedArticleState);
	};

	const handleReset = () => {
		setUpdatedArticleState(initialArticleState);
		setArticleState(initialArticleState);
	};

	return (
		<>
			<ArrowButton onOpen={onOpen} isOpen={isOpen} />
			<aside
				ref={ref}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} style={{ gap: 50 }} onSubmit={handleSubmit}>
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
						selected={
							findSelectedOption(
								contentWidthArr,
								updatedArticleState['--container-width']
							) || null
						}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
