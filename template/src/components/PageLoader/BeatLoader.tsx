import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

const Duration = 0.7;

interface BeatLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: string | number;
  color?: string;
  speed?: number;
  count?: number;
}

const BeatLoader: React.FC<BeatLoaderProps> = ({
  size,
  color,
  speed = 1,
  count = 3,
  className,
  ...restProps
}) => {
  const realSpeed = React.useMemo(() => (speed > 1 ? Math.round(speed) : 1), [speed]);
  const realCount = React.useMemo(() => (count > 3 ? Math.round(count) : 3), [count]);

  const { oddStyle, evenStyle } = React.useMemo(() => {
    const animationDuration = realSpeed > 1 ? `${Duration / realSpeed}s` : undefined;
    const animationDelay = realSpeed > 1 ? `${Duration / 2 / realSpeed}s` : undefined;

    const oddStyle = {
      width: size,
      height: size,
      backgroundColor: color,
      animationDuration
    };
    const evenStyle = {
      width: size,
      height: size,
      backgroundColor: color,
      animationDuration,
      animationDelay
    };

    return {
      oddStyle,
      evenStyle
    };
  }, [color, realSpeed, size]);

  const childs = React.useMemo(() => {
    return new Array(realCount)
      .fill(undefined)
      .map((_, i) => <span style={(i + 1) % 2 === 0 ? evenStyle : oddStyle} key={i} />);
  }, [evenStyle, oddStyle, realCount]);

  return (
    <span className={classnames(styles.beatLoader, className)} {...restProps}>
      {childs}
    </span>
  );
};

export default BeatLoader;
