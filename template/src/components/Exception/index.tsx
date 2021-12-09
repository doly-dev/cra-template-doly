import React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

interface ExceptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
}

const Exception: React.FC<ExceptionProps> = ({
  icon,
  title,
  desc,
  extra,
  actions,
  className,
  ...props
}) => {
  return (
    <div className={classnames(styles.exception, className)} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <div className={styles.title}>{title}</div>}
      {desc && <div className={styles.desc}>{desc}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && (
        <div className={styles.actions}>
          {actions.map((item, index) => (
            <div className={styles.item} key={index}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exception;
