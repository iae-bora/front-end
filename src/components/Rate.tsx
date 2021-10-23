import Rating from '@material-ui/lab/Rating';

type RateProps = {
    
    rating: string;
}

export function Rate(props: RateProps) {
  const ratingValue = parseInt(props.rating)  
  return (
      <Rating name="read-only" precision={0.1} value= {ratingValue} size="medium" readOnly />
  );
}