

export default function userProfilePage(props) {

  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  )
}

export async function getSeverSideProps(context) {
    const { params, req, res } = context;


    return {
        props: {
            username: 'Max'
        }
    }
}
