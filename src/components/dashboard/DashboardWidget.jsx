/* eslint-disable jsx-a11y/img-redundant-alt */
const DashboardWidget = ({
  title,
  icon,
  value,
  color = 'bg-gradient-danger',
}) => {
  return (
    <div className="col-md-4 stretch-card grid-margin text-center">
      <div className={`card ${color} card-img-holder text-white`}>
        <div className="card-body">
          <img
            src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
            className="card-img-absolute"
            alt="circle-image"
          />
          <h4 className="mt-3">
            <i className={`fa fa-${icon} mx-2`} />
            {title}
          </h4>
          <h4 className="mb-3">{value}</h4>
        </div>
      </div>
    </div>
  )
}

export default DashboardWidget
